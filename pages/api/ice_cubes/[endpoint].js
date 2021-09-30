import { supabaseAdmin } from "@/services/supabase-admin";

export default async (req, res) => {
	console.log(req.headers);
	const token = req.headers.authorization;
	const endpoint = req.query.endpoint;

	try {
		if (req.method === "GET") {
			const profileId = await verifyApiToken(token);
			const { data: tray, error: luError } = await supabaseAdmin
				.from("trays")
				.select("*, ice_cubes(*), profile( usage_limits(*) )")
				.match({ endpoint, profile: profileId });
			if (luError || !tray || tray.length === 0) {
				throw luError || "This is not a valid endpoint for your account.";
			}
			const deleteOnSuccess = req.body.deleteOnComplete;

			const canBeDeepFreeze = tray[0].profile.usage_limits.customExpirationLimit;
			await deleteIceCubes(canBeDeepFreeze && tray[0].deepFreeze, tray[0].id, profileId, deleteOnSuccess);

			res.send({
				records: tray[0].ice_cubes.map((cube) => JSON.parse(cube.data) || {}),
				success: true,
			});
		} else if (req.method === "POST") {
			const record = JSON.stringify(req.body);

			const profileId = await verifyApiToken(token);
			const isSuccess = await addIceCube(record, endpoint, profileId);
			res.send({ success: isSuccess, message: "The ice cube has been added to the tray." });
		} else {
			throw "Not a valid request";
		}
	} catch (err) {
		console.log("===> Error", err);
		if (err.unauthorized === true) {
			res.status(401).send({ success: false, message: "Unauthorized request" });
		} else {
			res.status(err ? 400 : 500).send({ success: false, message: err || "Internal Service Error" });
		}
	}
};

async function verifyApiToken(token) {
	/* Make sure the token exists and they it's been copied from the frontend - which includes the "QF_" */
	if (!token || !token.includes("QF_")) {
		throw "You must include a token in this request";
	}
	console.log(token);
	const formatted = token.split("Bearer ")[1];
	const secret = formatted.split("QF_")[1];

	try {
		const { data, error } = await supabaseAdmin.from("api_tokens").select("secret, profile").eq("secret", secret);
		if (error || data.length === 0) {
			throw error || "A tray with with this endpoint could not found with the supplied token";
		}
		return data[0].profile;
	} catch (err) {
		throw { err, unauthorized: true };
	}
}

async function addIceCube(record, endpoint, profile) {
	if (!record) {
		return true;
	}

	try {
		const { data: profiles, error } = await supabaseAdmin.from("profiles").select("id, usage_limits (*), trays (*)").eq("id", profile);
		if (error || profiles.length === 0) {
			throw error || "A tray with with this endpoint could not found with the supplied token";
		}

		const { trays, usage_limits } = profiles[0];
		const tray = trays.find((tray) => tray.endpoint === endpoint);
		if (!tray) {
			throw "A tray with with this endpoint could not found with the supplied token";
		}

		const byteSize = Buffer.byteLength(Buffer.from(record));
		console.log(byteSize);

		if (tray.total_bytes + byteSize > usage_limits.traySize) {
			throw "This tray has reached it's data limit.";
		}

		const iceCube = {
			data: record,
			tray: tray.id,
			size: byteSize,
			profile: profiles[0].id,
		};

		const { error: cubeError, data: cube } = await supabaseAdmin.from("ice_cubes").insert(iceCube);
		if (cubeError) {
			throw cubeError;
		}
		const { error: trayError } = await supabaseAdmin
			.from("trays")
			.update({ total_bytes: tray.total_bytes + byteSize, updated_at: new Date() })
			.eq("id", tray.id);
		if (trayError) {
			await supabaseAdmin.from("ice_cubes").delete({ id: cube.id });
			throw trayError;
		}

		return true;
	} catch (err) {
		throw err;
	}
}

async function deleteIceCubes(isDeepFreeze, trayId, profile, deepFreezeDelete) {
	console.log("no delete", isDeepFreeze && !deepFreezeDelete);
	if (isDeepFreeze && !deepFreezeDelete) {
		return;
	}

	try {
		const { error } = await supabaseAdmin.from("ice_cubes").delete().match({ profile, tray: trayId });
		if (error) {
			throw error;
		}
		const { error: tError } = await supabaseAdmin.from("trays").update({ total_bytes: 0, updated_at: new Date() }).eq("id", trayId);
		if (tError) {
			throw tError;
		}
	} catch (err) {
		throw err;
	}
}
