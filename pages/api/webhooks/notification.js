import { supabaseAdmin } from "@/services/supabase-admin";
import emailer from "@/services/emailer";
import sub from "date-fns/sub";
import add from "date-fns/add";
import isBefore from "date-fns/isBefore";

import isSameDay from "date-fns/isSameDay";

const testing = process.env.NODE_ENV === "development" && true; // cannot be set to true in prod

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

		const traysByProfile = [];

		for (let i = 0; i < data.length; i++) {
			const limits = data[i].usage_limits;

			const tempTrays = [];
			for (let t = 0; t < data[i].trays.length; t++) {
				const tray = data[i].trays[t];

				let expirationDays = limits.expirationLimit;
				if (limits.customExpirationLimit && tray.custom_expiration_limit) {
					expirationDays = tray.expiration_limit || limits.expirationLimit;
				}

				const warningDate = sub(new Date(), { days: expirationDays - 1 });

				const warning = filterIceCubes(warningDate, tray.ice_cubes);

				// cache trays to be added later
				if (warning.length > 0) {
					tempTrays.push({
						name: tray.name,
						endpoint: tray.endpoint,
						trayId: tray.id,
						cubes: warning,
					});
				}
			}

			// add trays to profile entry
			if (tempTrays.length > 0) {
				traysByProfile.push({
					id: data[i].id,
					email: data[i].email,
					trays: tempTrays,
				});
			}
		}
		console.log("Melting Trays", traysByProfile);

		for (let i = 0; i < traysByProfile.length; i++) {
			await sendWarningEmail(traysByProfile[i].email, traysByProfile[i].trays);
		}

		res.status(200).send();
	} catch (err) {
		console.log("=> Error: ", err.message);
		await supabaseAdmin.from("failures").insert({ stack: err, message: err.message || err, raw: err });
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
};

async function sendWarningEmail(email, trays) {
	const template = "d-6d3c07125b94492c932a390622c30976";

	const cData = {
		trays: trays.map((tray) => ({ name: tray.name, endpoint: tray.endpoint, ice_cubes: tray.cubes.length })),
	};
	console.log("trays for email", email, cData);
	try {
		await emailer(email, template, cData);
	} catch (err) {
		console.log(err);
		throw err;
	}
}

function filterIceCubes(warningDate, cubes) {
	const melting = [];
	for (let i = 0; i < cubes.length; i++) {
		const cubeCreated = add(new Date(cubes[i].expiration_start), { days: 1 });

		if (isSameDay(cubeCreated, warningDate)) {
			melting.push(cubes[i]);
		}
	}

	return melting;
}
