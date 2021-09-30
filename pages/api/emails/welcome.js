import emailer from "@/services/emailer";

export default async (req, res) => {
	console.log("sending welcome emails");
	const { firstName, lastName, email } = req.body;

	if (req.method !== "POST" || !firstName) {
		return res.status(400).send();
	}

	try {
		const userEmail = await emailer(email, "d-304991d5944f4907b630377c2aff1012", { firstName });
		const adminNotif = await emailer("support@quickfreeze.io", "d-caedbdfe5c7744f7bcb000f7a8386bff", { firstName, lastName, email });
		console.log("complete");
		res.send({ success: true });
	} catch (err) {
		console.log(err);
		res.status(400).send({ success: false, error: err });
	}
};
