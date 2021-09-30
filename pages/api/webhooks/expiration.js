import { supabaseAdmin } from "@/services/supabase-admin";
import emailer from "@/services/emailer";
import sub from "date-fns/sub";
import add from "date-fns/add";
import isBefore from "date-fns/isBefore";

import isSameDay from "date-fns/isSameDay";

const testing = process.env.NODE_ENV === "development" && false; // cannot be set to true in prod

export default async (req, res) => {
	console.log(testing ? " 💥 💥 WEBHOOK SET TO TESTING" : "Running webhook");

	if (req.method !== "POST") {
		return res.status(400).send();
	}

	try {
		const { authorization } = req.headers;
		if (authorization !== `Bearer ${process.env.CRON_KEY}`) {
			throw "Unauthorized Request";
		}

		const { data, error } = await supabaseAdmin
			.from("profiles")
			.select(
				"id, email, usage_limits (*), trays(id, name, endpoint, expiration_limit, custom_expiration_limit, ice_cubes(id, expiration_start) )"
			);
		if (error) {
			throw error;
		}

		let deleteIds = [];

		for (let i = 0; i < data.length; i++) {
			const limits = data[i].usage_limits;

			for (let t = 0; t < data[i].trays.length; t++) {
				const tray = data[i].trays[t];

				let expirationDays = limits.expirationLimit;
				if (limits.customExpirationLimit && tray.custom_expiration_limit) {
					expirationDays = tray.expiration_limit || limits.expirationLimit;
				}

				const expirationDate = sub(new Date(), { days: expirationDays });

				const expired = filterIceCubes(expirationDate, tray.ice_cubes);

				if (expired.length > 0) {
					deleteIds = [...deleteIds, ...expired.map((item) => item.id)];
				}
			}
		}

		if (deleteIds.length > 0) {
			await deleteIceCubes(deleteIds);
		}

		res.status(200).send();
	} catch (err) {
		console.log("=> Error: ", err.message || err);
		await supabaseAdmin.from("failures").insert({ stack: err, message: err.message || err, raw: err });
		return res.status(400).send(`Webhook Error: ${err.message || err}`);
	}
};
async function deleteIceCubes(deleteIds) {
	console.log("deleteIds", deleteIds);

	try {
		await supabaseAdmin.from("ice_cubes").delete().in("id", deleteIds);
	} catch (err) {
		console.log(err);
		throw err;
	}
}

function filterIceCubes(expirationDate, cubes) {
	const expired = [];
	for (let i = 0; i < cubes.length; i++) {
		const cubeCreated = add(new Date(cubes[i].expiration_start), { days: 1 });

		if (isSameDay(cubeCreated, expirationDate) || isBefore(cubeCreated, expirationDate)) {
			expired.push(cubes[i]);
		}
	}

	return expired;
}
