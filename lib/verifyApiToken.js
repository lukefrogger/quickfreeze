export default async function verifyApiToken(token) {
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
		throw { err, unauthorized: true };
	}
}
