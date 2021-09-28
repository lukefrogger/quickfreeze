import { supabase } from "@/services/supabase";
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

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

		if (req.method === "POST") {
			const { data: user } = await supabase.from("profiles").select("stripe_customer").single();

			const session = await stripe.billingPortal.sessions.create({
				customer: user.stripe_customer,
			});
			return res.status(303).send({ url: session.url, success: true });
		}
	} catch (err) {
		console.log("===> Error", err);

		res.status(400).send({ success: false, message: "", error: err });
	}
};
