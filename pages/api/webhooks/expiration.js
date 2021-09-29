import { supabaseAdmin } from "@/services/supabase-admin";
const testing = process.env.NODE_ENV === "development" && false; // cannot be set to true in prod

export default async (req, res) => {
	console.log(testing ? " 💥 💥 WEBHOOK SET TO TESTING" : "Running webhook");

	if (req.method !== "POST") {
		return res.status(400).send();
	}

	try {
		res.status(200).send();
	} catch (err) {
		console.log("=> Error: ", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
};
