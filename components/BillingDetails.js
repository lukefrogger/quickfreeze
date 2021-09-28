import Button from "@/atoms/Button";
import { useEffect, useState } from "react";
import BillingLimitBar from "./BillingLimitBar";
import format from "date-fns/format";
import Link from "next/link";

export default function BillingDetails({ currentSub, trays }) {
	const [plan, setPlan] = useState(false);

	useEffect(() => {
		console.log("sub", currentSub);
		if (currentSub && trays != undefined) {
			console.log(currentSub);
			setPlan(currentSub);
		}
	}, [currentSub, trays]);

	if (!plan) {
		return <div></div>;
	}

	return (
		<div className="flex flex-col lg:flex-row">
			<div className="w-1/3 mr-8 overflow-hidden">
				<div className="text-sm text-gray-300 mt-4">Current Plan</div>
				<div className="text-2xl mb-2 border-b pb-2 ">{plan.product.name}</div>
				<div className="flex items-center justify-between">
					<div className="text-lg text-bold mr-4">Total</div>
					<div className="flex items-end">
						<div className="mb-1">$</div>
						<div className="text-3xl mr-1 ">{plan.amount}</div>
						<div className="mb-1">/{plan.interval}</div>
					</div>
				</div>
				{/* <div className="text-sm text-right text-primary">Billed monthly</div> */}
				<div className="mt-8 flex">
					<Link href="/app/plans" passHref>
						<Button color="primary" type="outline" full>
							Manage Subscription
						</Button>
					</Link>
				</div>
			</div>
			<div className="flex-1">
				{currentSub.current_period_end && (
					<div className="flex-1">
						<div className="text-sm text-gray-300 mt-4">Payment Details</div>
						<div className="flex">
							{currentSub.cancel_at_period_end ? (
								<span>
									Your subscription will <span className="underline">cancel</span> on
								</span>
							) : (
								<span>Your next statement will be issued on</span>
							)}
							<div className="font-semibold">&nbsp;{format(new Date(currentSub.current_period_end), "MMM d, yyyy")}</div>
						</div>
					</div>
				)}
				<div className="flex-1 mt-4">
					<div className="text-sm text-gray-300 mt-4">Subscription Limits</div>
					<BillingLimitBar limit={plan.product.numOfTrays} currentNum={trays} title="trays" />
				</div>
			</div>
		</div>
	);
}
