import { supabaseAdmin } from "@/services/supabase-admin";
import parseStripeDate from "lib/parseStripeDate";

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const testing = process.env.NODE_ENV === "development" && false; // cannot be set to true in prod

export default async (req, res) => {
	console.log(testing ? " 💥 💥 WEBHOOK SET TO TESTING" : "Running webhook");
	const payload = req.body;

	// Only working with post requests
	if (req.method !== "POST") {
		return res.status(400).send();
	}

	try {
		// const stripeEvent = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		const subscription = payload.data.object;

		switch (payload.type) {
			case "checkout.session.completed":
				console.log("Checkout session completed");
				await updateProfileWithCustomer(subscription);

			case "customer.subscription.deleted":
				console.log(`Subscription is deleted`);
				await deleteSubscription(subscription);
				break;
			case "customer.subscription.created":
				console.log(`Create Subscription`);
				await createSubscription(subscription);
				break;
			case "customer.subscription.updated":
				console.log(`Update Subscription`);
				await updateSubscription(subscription);
				break;
		}
		res.status(200).send();
	} catch (err) {
		console.log("=> Error: ", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
};

async function updateProfileWithCustomer(checkoutSession) {
	try {
		const { error: uError } = await supabaseAdmin
			.from("profiles")
			.update({ stripe_customer: checkoutSession.customer })
			.eq("email", !testing ? checkoutSession.customer_details.email : "luke.frauhiger@gmail.com");
		if (uError) {
			throw uError;
		}
	} catch (err) {
		console.log("Error on creation", err);
		throw err;
	}
}

async function createSubscription(stripeSub) {
	try {
		const { data: products, error: pError } = await supabaseAdmin
			.from("products")
			.select("*")
			.eq("id", !testing ? stripeSub.items.data[0].price.product : "test123test");
		if (pError || products.length === 0) {
			throw pError || "There are not matching products";
		}

		const { data: profiles, error } = await supabaseAdmin
			.from("profiles")
			.select("id, email, stripe_customer, subscriptions(*), usage_limits(id)")
			.eq("stripe_customer", !testing ? stripeSub.customer : "test123test");
		if (error || profiles.length === 0) {
			throw error || "No profiles found for this subscription session ";
		}

		const profile = profiles[0];

		// Create new sub
		const newSub = {
			profile: profile.id,
			stripe_id: stripeSub.id,
			status: "active",
			product: products[0].id,
			cancel_at_period_end: stripeSub.cancel_at_period_end,
			current_period_start: parseStripeDate(stripeSub.current_period_end),
			current_period_end: parseStripeDate(stripeSub.current_period_start),
			interval: stripeSub.items.data[0].plan.interval,
			amount: stripeSub.items.data[0].plan.amount / 100,
		};
		const { error: subError } = await supabaseAdmin.from("subscriptions").insert(newSub, { returning: "minimal" });
		if (subError) {
			throw subError;
		}

		// Cancel old sub (should be a freemium sub)
		const activeSubs = profile.subscriptions.filter((sub) => sub.status === "active");
		if (activeSubs.length > 0) {
			const { error } = await supabaseAdmin
				.from("subscriptions")
				.update({ status: "canceled" }, { returning: "minimal" })
				.eq("id", activeSubs[0].id);
			if (error) {
				throw error;
			}
		}

		//Update usage_limits
		const prod = products[0];
		const { error: uError } = await supabaseAdmin
			.from("usage_limits")
			.update({
				numOfTrays: prod.numOfTrays,
				traySize: prod.traySize,
				deepFreeze: prod.deepFreeze,
				expirationLimit: prod.expirationLimit,
				customExpirationLimit: prod.customExpirationLimit,
				product: prod.id,
				updated_at: new Date(),
			})
			.eq("id", profile.usage_limits.id);
		if (uError) {
			throw uError;
		}
	} catch (err) {
		console.log("Error on creation", err);
		if (!process.env.NODE_ENV === "development") {
			await supabaseAdmin.from("failures").insert(
				{
					raw: JSON.stringify(err) || err,
					message: err.message || "",
					stack: error.toString() || "",
				},
				{ returning: "minimal" }
			);
		}
		throw err;
	}
}

async function updateSubscription(stripeSub) {
	try {
		/* Order intentionally to provide more between a potentially quick create -> update situation */
		const { data: products, error: pError } = await supabaseAdmin
			.from("products")
			.select("*")
			.eq("id", !testing ? stripeSub.items.data[0].price.product : "test987test");
		if (pError || products.length === 0) {
			throw pError || "There are not matching products";
		}

		const { data: profiles, error } = await supabaseAdmin
			.from("profiles")
			.select("id, stripe_customer, subscriptions(*), usage_limits(id)")
			.eq("stripe_customer", !testing ? stripeSub.customer : "test123test");
		if (error || profiles.length === 0) {
			throw error || "No profiles found for this subscription update session ";
		}

		const profile = profiles[0];
		const prod = products[0];

		const activeSubs = profile.subscriptions.filter((sub) => sub.stripe_id === stripeSub.id);

		// Create update sub obj
		const newSub = {
			status: "active",
			product: prod.id,
			cancel_at_period_end: stripeSub.cancel_at_period_end,
			current_period_start: parseStripeDate(stripeSub.current_period_start),
			current_period_end: parseStripeDate(stripeSub.current_period_end),
			cancel_at: parseStripeDate(stripeSub.cancel_at),
			canceled_at: parseStripeDate(stripeSub.canceled_at),
			interval: stripeSub.items.data[0].plan.interval,
			amount: stripeSub.items.data[0].plan.amount / 100,
			updated_at: new Date(),
		};
		const { error: subError } = await supabaseAdmin
			.from("subscriptions")
			.update(newSub, { returning: "minimal" })
			.eq("id", activeSubs[0].id);
		if (subError) {
			throw subError;
		}

		//Update usage_limits

		const { error: uError } = await supabaseAdmin
			.from("usage_limits")
			.update({
				numOfTrays: prod.numOfTrays,
				traySize: prod.traySize,
				deepFreeze: prod.deepFreeze,
				expirationLimit: prod.expirationLimit,
				customExpirationLimit: prod.customExpirationLimit,
				product: prod.id,
				updated_at: new Date(),
			})
			.eq("id", profile.usage_limits.id);
		if (uError) {
			throw uError;
		}
	} catch (err) {
		console.log("Error on creation", err);
		if (!process.env.NODE_ENV === "development") {
			await supabaseAdmin.from("failures").insert(
				{
					raw: JSON.stringify(err) || err,
					message: err.message || "",
					stack: error.toString() || "",
				},
				{ returning: "minimal" }
			);
		}
		throw err;
	}
}

// TODO: TEST HERE
async function deleteSubscription(stripeSub) {
	try {
		const { data: products, error: pError } = await supabaseAdmin.from("products").select("*").match({ price: 0, active: true });
		if (pError || products.length === 0) {
			throw pError || "There are not matching products";
		}

		const { data: profiles, error: prError } = await supabaseAdmin
			.from("profiles")
			.select("id, stripe_customer, subscriptions(*), usage_limits(id)")
			.eq("stripe_customer", !testing ? stripeSub.customer : "test123test");
		if (prError || profiles.length === 0) {
			throw error || "No profiles found for this subscription update session ";
		}

		const profile = profiles[0];
		const prod = products[0];

		/* Cancel paid plan */
		const activeSubs = profile.subscriptions.filter((sub) => sub.stripe_id === stripeSub.id);
		if (activeSubs.length === 0) {
			return;
		}
		const { error } = await supabaseAdmin
			.from("subscriptions")
			.update({ status: "canceled" }, { returning: "minimal" })
			.eq("id", activeSubs[0].id);
		if (error) {
			throw error;
		}

		/* Create new freemium account */
		const newSub = {
			status: "active",
			product: prod.id,
			cancel_at_period_end: false,
			current_period_start: new Date(),
			profile: profile.id,
		};
		const { error: subError } = await supabaseAdmin.from("subscriptions").insert(newSub, { returning: "minimal" });
		if (subError) {
			throw subError;
		}

		//Update usage_limits
		const { error: uError } = await supabaseAdmin
			.from("usage_limits")
			.update({
				numOfTrays: prod.numOfTrays,
				traySize: prod.traySize,
				deepFreeze: prod.deepFreeze,
				expirationLimit: prod.expirationLimit,
				customExpirationLimit: prod.customExpirationLimit,
				product: prod.id,
				updated_at: new Date(),
			})
			.eq("id", profile.usage_limits.id);
		if (uError) {
			throw uError;
		}
	} catch (err) {
		console.log("Error on creation", err);
		if (!process.env.NODE_ENV === "development") {
			await supabaseAdmin.from("failures").insert(
				{
					raw: JSON.stringify(err) || err,
					message: err.message || "",
					stack: error.toString() || "",
				},
				{ returning: "minimal" }
			);
		}
		throw err;
	}
}
