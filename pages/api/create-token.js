import { supabase } from "@/services/supabase";
const crypto = require("crypto");
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, names } from "unique-names-generator";

export default async (req, res) => {
	const token = req.headers.token;

	/* Verify the request based on the token */
	try {
		const { data: user, error } = await supabase.auth.api.getUser(token);
		if (error) {
			throw error;
		}

		/* SUPER SECRET TOKEN CREATION */
		const uniqueString = uniqueNamesGenerator({
			dictionaries: [colors, adjectives, animals, starWars, names],
			style: "upperCase",
			separator: "-",
			length: "3",
		});
		const createdDate = new Date().toISOString();
		const sha = crypto.createHash("sha256").update(`${uniqueString}_${user}`).digest("base64");
		const final = crypto.createHash("md5").update(sha).digest("hex");

		const tokenRow = {
			key: uniqueString,
			secret: final,
			created: createdDate,
			user_id: user.id,
		};
		const { error: insertError } = await supabase.from("api_tokens").insert([tokenRow], { returning: "minimal" });
		if (insertError) {
			throw insertError;
		}

		return res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		if (err.message) {
			return res.status(401).json({ error: error.message });
		}
		return res.status(401).json({ error: err });
	}
};

function decrypt(token) {
	// temp = decrypt md5
	// key_created = decrypt SHA256 (with an underscore)
	// lookup token by created and key
	// lookup endpoint by userId and endpoint used
}
