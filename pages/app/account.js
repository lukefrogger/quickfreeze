import Card from "@/atoms/Card";
import SmallHeader from "@/atoms/SmallHeader";
import Spinner from "@/atoms/Spinner";
import InlineCardField from "@/components/InlineForm/InlineCardField";
import AppLayout from "@/components/layouts/AppLayout";
import Message from "@/components/Message";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";
import Tokens from "@/components/Tokens";
import BillingDetails from "@/components/BillingDetails";
import InlineText from "@/components/InlineForm/InlineText";

export default function Account() {
	const [fail, setFail] = useState(false);
	const [profile, setProfile] = useState(false);
	const [sub, setSub] = useState(false);
	const [tokens, setTokens] = useState(false);
	const [loading, setLoading] = useState(false);
	const [trays, setTrays] = useState(false);

	useEffect(() => {
		setFail(false);
		const query = async () => {
			try {
				const { data, error } = await supabase
					.from("profiles")
					.select("id, email, phone, subscriptions( *, product (*) ), trays (id, endpoint), api_tokens(id, created, secret)");
				if (error) {
					throw error;
				}
				if (data.length === 0) {
					return setFail("There was a problem getting your account information.");
				}

				setProfile({
					email: data[0].email,
					phone: data[0].phone,
				});
				setSub(data[0].subscriptions.find((item) => item.status === "active"));
				setTokens(data[0].api_tokens);
				setTrays(data[0].trays);
			} catch (err) {
				console.log(err);
				setFail(err.message || "You're trays couldn't be found");
			} finally {
				setLoading(false);
			}
		};

		query();
	}, []);

	const updateProfile = async (value, key) => {
		console.log(key, value);
		try {
			const { data, error } = await supabase
				.from("profiles")
				.update({ [key]: value, updated_at: new Date() })
				.match({ id: supabase.auth.currentUser.id });

			if (error) {
				throw error;
			}
			setProfile(data[0]);
		} catch (err) {
			setFail(err.message || "The changes to your tray could not be saved");
		}
	};

	return (
		<AppLayout>
			<h4 className="text-3xl mb-2">Account Details</h4>
			{fail && (
				<div className="mb-4 mt-4">
					<Message warning={true}>{fail}</Message>
				</div>
			)}
			{loading && <Spinner size="3x" />}
			{!loading && !fail && (
				<>
					<Card>
						<SmallHeader>Personal Information</SmallHeader>
						<div className="flex flex-wrap">
							<InlineText label="Email Address" value={profile.email} />
							<InlineCardField
								initialValue={profile.phone}
								label="Phone Number"
								type="phone"
								saveChange={(value) => updateProfile(value, "phone")}
								placeHolder="555-555-5555"
							/>
						</div>
					</Card>
					<Card className="mt-4">
						<SmallHeader>API Tokens</SmallHeader>
						<Tokens tokens={tokens} />
					</Card>
					<Card className="mt-4">
						<SmallHeader>Billing Details</SmallHeader>
						<BillingDetails currentSub={sub} trays={trays.length} />
					</Card>
				</>
			)}
		</AppLayout>
	);
}
