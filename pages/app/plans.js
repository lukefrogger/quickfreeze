import AppLayout from "@/components/layouts/AppLayout";
import Message from "@/components/Message";
import PricingTable from "@/components/PricingTable";
import { fetcher } from "@/services/api";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

export default function Plans() {
	const [currentPlan, setCurrentPlan] = useState(false);
	const [error, setError] = useState(false);
	const [fail, setFail] = useState(false);

	useEffect(() => {
		const planQuery = async () => {
			try {
				const { error, data } = await supabase
					.from("subscriptions")
					.select("product(name, price, recurring, stripe_price), profile( email, stripe_customer )")
					.eq("status", "active");
				if (error || data.length === 0) {
					throw error;
				}
				setCurrentPlan(data[0]);
			} catch (err) {
				setError(err.message || "An active subscription could not be found.");
			}
		};
		planQuery();
	});

	const redirectToCheckout = async (id) => {
		console.log("redirect with", id);

		try {
			console.log(currentPlan.product.price === 0);
			const customerId = currentPlan.profile.stripe_customer;
			if (currentPlan.product.price === 0) {
				/* checkout page to start new sub */
				const session = await fetcher("/api/create-checkout-session", supabase.auth.currentSession.access_token, "POST", {
					hostUrl: window.location.origin,
					customerEmail: !customerId ? currentPlan.profile.email : "",
					customer: customerId,
					priceId: id,
				});
				if (!session.success) {
					throw session;
				}
				window.location.replace(session.url);
			} else {
				/* portal page to manage current sub */
				const redirect = await fetcher("/api/create-customer-portal", supabase.auth.currentSession.access_token, "POST");
				if (!redirect.success) {
					throw redirect;
				}
				window.location.replace(redirect.url);
			}
		} catch (err) {
			console.log(err);
			setFail(err.message || "There has been an error while creating your payment session.");
		}
	};

	return (
		<AppLayout>
			<h4 className="text-3xl mb-2">Subscriptions</h4>
			{fail && (
				<div className="mb-4">
					<Message warning={true}>{fail}</Message>
				</div>
			)}
			{currentPlan && currentPlan.product && (
				<div className="mb-4">
					<span>Current Subscription: </span>
					<span className="text-primary font-bold">
						{currentPlan.product.name} - ${currentPlan.product.price}/{currentPlan.product.recurring}
					</span>
				</div>
			)}
			{error && <Message warning="true">{error}</Message>}
			{!error && (
				<PricingTable
					setSelected={redirectToCheckout}
					type="dark"
					stopLoading={fail !== false}
					currentPriceId={currentPlan.product && currentPlan.product.stripe_price}
				/>
			)}
		</AppLayout>
	);
}
