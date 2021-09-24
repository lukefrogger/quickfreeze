import { supabase } from "@/services/supabase";
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

export default async (req, res) => {
	const token = req.headers.token;
	const { customerEmail, hostUrl, priceId } = req.body;

	try {
		const { data: appUser, error } = await supabase.auth.api.getUser(token);
		if (error || !appUser || !appUser.id) {
			throw error;
		}
		supabase.auth.session = () => ({
			access_token: token,
		});

		if (req.method === "POST") {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: [
					{
						price: priceId,
						quantity: 1,
					},
				],
				customer_email: customerEmail,
				mode: "subscription",
				success_url: `${hostUrl}/app/account`,
				cancel_url: `${hostUrl}/app/plans`,
			});
			return res.status(303).send({ url: session.url, success: true });
		}
	} catch (err) {
		console.log("===> Error", err);

		res.status(400).send({ success: false, message: "", error: err });
	}
};
