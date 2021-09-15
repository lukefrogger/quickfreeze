import { supabase } from "@/services/supabase";
const crypto = require("crypto");
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, names } from "unique-names-generator";

export default async (req, res) => {
	const token = req.headers.token;

	/* Verify the request based on the token */
	try {
		const { data: appUser, error } = await supabase.auth.api.getUser(token);
		if (error || !appUser || !appUser.id) {
			throw error;
		}
		supabase.auth.session = () => ({
			access_token: token,
		});

		/* SUPER SECRET TOKEN CREATION */
		const uniqueString = uniqueNamesGenerator({
			dictionaries: [colors, adjectives, animals, starWars, names],
			style: "upperCase",
			separator: "-",
			length: "3",
		});

		const createdDate = new Date().toISOString();
		const sha = crypto.createHash("sha256").update(`${uniqueString}_${appUser.id}`).digest("base64");
		const final = crypto.createHash("md5").update(sha).digest("hex");

		const tokenRow = {
			key: uniqueString,
			secret: `QF_${final}`,
			created: createdDate,
			profile: appUser.id,
		};

		const { error: insertError, data } = await supabase.from("api_tokens").insert(tokenRow);
		if (insertError) {
			throw insertError;
		}

		console.log(data);
		return res.status(200).json({ success: true, record: { id: data[0].id, created: data[0].created, secret: data[0].secret } });
	} catch (err) {
		console.log("error - create token", err);
		if (err.message) {
			return res.status(401).json({ error: err.message });
		}
		return res.status(401).json({ error: err });
	}
};

function decrypt(token) {
	// remove QF_
	// temp = decrypt md5
	// key_created = decrypt SHA256 (with an underscore)
	// lookup token by created and key
	// lookup endpoint by userId and endpoint used
}
