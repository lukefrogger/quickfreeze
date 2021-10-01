import { supabaseAdmin } from "@/services/supabase-admin";
import Cors from "cors";
import initMiddleware from "lib/init-middleware";

const cors = initMiddleware(
	Cors({
		methods: ["GET", "POST"],
		origin: "*",
	})
);
export default async (req, res) => {
	try {
		await cors(req, res);

		const endpoint = req.query.endpoint;

		if (req.method === "GET") {
			const { data: trays, error: luError } = await supabaseAdmin
				.from("trays")
				.select("*, ice_cubes(*), profile( id, usage_limits(*) )")
				.match({ endpoint });
			if (luError || !trays || trays.length === 0) {
				throw luError || "This is not a valid endpoint.";
			}
			const deleteOnSuccess = req.body.deleteOnComplete;

			const canBeDeepFreeze = trays[0].profile.usage_limits.customExpirationLimit;
			await deleteIceCubes(canBeDeepFreeze && trays[0].deepFreeze, trays[0].id, deleteOnSuccess);

			res.send({
				records: trays[0].ice_cubes.map((cube) => JSON.parse(cube.data) || {}),
				success: true,
			});
		} else if (req.method === "POST") {
			const record = JSON.stringify(req.body);

			const isSuccess = await addIceCube(record, endpoint);
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

async function addIceCube(record, endpoint) {
	if (!record) {
		return true;
	}

	try {
		const { data: trays, error } = await supabaseAdmin
			.from("trays")
			.select("*, profile( id, usage_limits(traySize) )")
			.match({ endpoint });
		if (error || trays.length === 0) {
			throw error || "A tray with with this endpoint could not found";
		}

		const tray = trays[0];

		const byteSize = Buffer.byteLength(Buffer.from(record));
		console.log(byteSize);

		if (tray.total_bytes + byteSize > tray.profile.usage_limits.traySize) {
			throw "This tray has reached it's data limit.";
		}

		const iceCube = {
			data: record,
			tray: tray.id,
			size: byteSize,
			profile: tray.profile.id,
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

async function deleteIceCubes(isDeepFreeze, trayId, deepFreezeDelete) {
	console.log("no delete", isDeepFreeze && !deepFreezeDelete);
	if (isDeepFreeze && !deepFreezeDelete) {
		return;
	}

	try {
		const { error } = await supabaseAdmin.from("ice_cubes").delete().match({ tray: trayId });
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
