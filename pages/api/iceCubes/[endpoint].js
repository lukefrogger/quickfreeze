import { supabaseAdmin } from "@/services/supabase-admin";

export default async (req, res) => {
	const token = req.headers.authorization;
	const endpoint = req.query.endpoint;

	try {
		if (req.method === "GET") {
			// const iceCubes = await supabaseAdmin
			// 	.from("trays")
			// 	.select("deepFreeze, total_bytes, ice_cubes(id, data, size)")
			// 	.eq({ endpoint, profile: user.id });
			// console.log(iceCubes);
			res.json("not setup");
		} else if (req.method === "POST") {
			const record = JSON.stringify(req.body);

			const profile = await verifyApiToken(token);
			const isSuccess = await addIceCube(record, endpoint, profile);
			res.send({ success: isSuccess, message: "The ice cube has been added to the tray." });
		} else {
			throw "Not a valid request";
		}
	} catch (err) {
		console.log("===> Error", err);
		if (err.unauthorized === true) {
			res.status(401).send({ success: false, message: "Unauthorized request" });
		}
		res.status(err ? 400 : 500).send({ success: false, message: err || "Internal Service Error" });
	}
};

async function verifyApiToken(token) {
	/* Make sure the token exists and they it's been copied from the frontend - which includes the "QF_" */
	if (!token || !token.includes("QF_")) {
		false;
	}
	const formatted = token.split("Bearer ")[1];
	const secret = formatted.split("QF_")[1];

	try {
		const { data, error } = await supabaseAdmin.from("api_tokens").select("secret, profile").eq("secret", secret);
		if (error || data.length === 0) {
			throw error || "A tray with with this endpoint could not found with the supplied token";
		}
		return data[0].profile;
	} catch (err) {
		console.error(err);
		throw err;
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
			created: new Date(),
			data: record,
			tray: tray.id,
			size: byteSize,
			profile: profiles[0].id,
		};
		console.log(iceCube);

		const { error: cubeError, data: cube } = await supabaseAdmin.from("ice_cubes").insert(iceCube);
		if (cubeError) {
			throw cubeError;
		}
		const { error: trayError } = await supabaseAdmin
			.from("trays")
			.update({ total_bytes: tray.total_bytes + byteSize })
			.eq("id", tray.id);
		if (trayError) {
			await supabaseAdmin.from("ice_cubes").delete({ id: cube.id });
			throw trayError;
		}

		return true;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
