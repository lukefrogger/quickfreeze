import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import Message from "@/components/Message";
import Link from "next/link";
import Standard from "@/components/trayForms/Standard";
import Button from "@/atoms/Button";
import Tokenless from "@/components/trayForms/Tokenless";

export default function NewTray() {
	const [fail, setFail] = useState(false);
	const [loading, setLoading] = useState(false);
	const [limits, setLimits] = useState(false);
	const [expirationLimits, setExpirationLimits] = useState([]);
	const [currentTab, setCurrentTab] = useState(1);

	const getLimits = async () => {
		try {
			const { data, error } = await supabase.from("profiles").select("id, trays (id, endpoint), usage_limits(*)");
			if (error) {
				throw error;
			}
			if (data.length === 0) {
				return setFail("There was a problem getting your account information.");
			}

			const profile = data[0];
			const temp = {
				trays: profile.trays,
				traysLeft: profile.usage_limits.numOfTrays - profile.trays.length,
				customExpirationLimit: profile.usage_limits.customExpirationLimit,
				expirationLimit: profile.usage_limits.expirationLimit,
				deepFreeze: profile.usage_limits.deepFreeze,
			};

			setLimits(temp);
		} catch (err) {
			console.log("error on limit fetch", err);
			setFail(err.message || "We could not load your profile information. You cannot create a tray right now. ");
			return false;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getLimits();
	}, []);

	useEffect(() => {
		if (limits) {
			if (!limits.customExpirationLimit) {
				setExpirationLimits([{ value: limits.expirationLimit, label: `${limits.expirationLimit} days` }]);
			} else {
				setExpirationLimits(
					Array.from(new Array(limits.expirationLimit)).map((empty, i) => ({
						value: i + 1,
						label: `${i + 1} day${i + 1 > 1 ? "s" : ""}`,
					}))
				);
			}
		}
	}, [limits]);

	return (
		<AppLayout>
			<h4 className="text-3xl mb-2">Create a tray</h4>
			{fail && (
				<div className="mb-4 mt-2">
					<Message warning={true}>{fail}</Message>
				</div>
			)}
			{limits && limits.traysLeft === 0 && (
				<Message>
					You have created the max number of trays that your subscription allows.{" "}
					<Link href="/app/plans/">
						<a className="underline">Upgrade here</a>
					</Link>{" "}
					to create more.
				</Message>
			)}
			{limits && limits.traysLeft > 0 && !loading && (
				<>
					<div className="w-full p-2 bg-black bg-opacity-20 border border-black border-opacity-10  rounded-lg">
						<div className="flex">
							<div>
								<Button
									color="primary"
									type={currentTab !== 1 ? "transparent" : null}
									color={currentTab === 1 ? "primary" : null}
									onClick={() => setCurrentTab(1)}
								>
									Standard
								</Button>
							</div>
							<div className="ml-2">
								<Button
									type={currentTab !== 2 ? "transparent" : null}
									color={currentTab === 2 ? "primary" : null}
									onClick={() => setCurrentTab(2)}
								>
									Tokenless
								</Button>
							</div>
						</div>
					</div>
					{currentTab === 1 && <Standard expirationLimits={expirationLimits} limits={limits} />}
					{currentTab === 2 && <Tokenless expirationLimits={expirationLimits} limits={limits} />}
				</>
			)}
		</AppLayout>
	);
}
