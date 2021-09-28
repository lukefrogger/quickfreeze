import { supabase } from "@/services/supabase";
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

export default async (req, res) => {
	const token = req.headers.token;
	const { customerEmail, customer, hostUrl, priceId } = req.body;

	if (!customer && !customerEmail) {
		throw "You must include an email address or customer Id start a subscription";
	}

	try {
		const { data: appUser, error } = await supabase.auth.api.getUser(token);
		if (error || !appUser || !appUser.id) {
			throw error;
		}
		supabase.auth.session = () => ({
			access_token: token,
		});

		const stripeReq = {
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${hostUrl}/app/account`,
			cancel_url: `${hostUrl}/app/plans`,
		};

		if (customer) {
			stripeReq.customer = customer;
		} else if (customerEmail) {
			stripeReq.customer_email = customerEmail;
		}

		if (req.method === "POST") {
			const session = await stripe.checkout.sessions.create(stripeReq);
			return res.status(303).send({ url: session.url, success: true });
		}
	} catch (err) {
		console.log("===> Error", err);

		res.status(400).send({ success: false, message: "", error: err });
	}
};
