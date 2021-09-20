import { supabase } from "@/services/supabase";
import { verifyRequest } from "lib/verifyRequest";
const crypto = require("crypto");
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, names } from "unique-names-generator";

export default async (req, res) => {
	const token = req.headers.token;

	try {
		const { data: appUser, error } = await supabase.auth.api.getUser(token);
		if (error || !appUser || !appUser.id) {
			throw error;
		}
		supabase.auth.session = () => ({
			access_token: token,
		});
		const { user: appUser, session } = verifyRequest(token);
		supabase.auth.session = session;

		/* SUPER SECRET TOKEN CREATION */
		const uniqueString = uniqueNamesGenerator({
			dictionaries: [colors, adjectives, animals, starWars, names],
			style: "upperCase",
			separator: "-",
			length: "3",
		});
		// const iv = crypto.randomBytes(16);

		const createdDate = new Date().toISOString();
		// const cipher = crypto.createCipheriv("aes-256-ctr", uniqueString, iv);
		// const encrypted = Buffer.concat([cipher.update(appUser.id), cipher.final()]);

		// const key = iv.toString("hex");
		// const final = encrypted.toString("hex");

		const sha = crypto.createHash("sha256").update(uniqueString).digest("base64");
		const final = crypto.createHash("md5").update(sha).digest("hex");

		const tokenRow = {
			secret: final,
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
