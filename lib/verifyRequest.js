import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import AES from "crypto-js/aes";

export async function verifyRequest(bearer, database) {
	//TODO: Do more/better auth here
	const token = bearer?.split(" ")[1];

	try {
		const decoded = AES.decrypt(token, "yourmomgoestocollege");
		console.log(decoded.toString(CryptoJS.enc.Utf8));

		const apiToken = await database.collection("apiKey").findOne({ decoded });
		if (!apiToken) {
			return "";
		}
		return apiToken.user_id;
	} catch (err) {
		throw err;
	}
}
