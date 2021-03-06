import AppLayout from "@/components/layouts/AppLayout";
import Card from "@/atoms/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import Message from "@/components/Message";
import Spinner from "@/atoms/Spinner";
import { formatBytesWithLabel } from "scripts/parseBytes";
import { useRouter } from "next/router";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [trays, setTrays] = useState(false);
	const [fail, setFail] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setLoading(true);
		const query = async () => {
			try {
				const { data, error } = await supabase
					.from("trays")
					.select("*, ice_cubes(size), profile( usage_limits( expirationLimit, customExpirationLimit ) )")
					.order("updated_at", { ascending: false });
				if (error) {
					throw error;
				}

				setTrays(data);
			} catch (err) {
				console.log(err);
				setFail(err.message || "You're trays couldn't be found");
			} finally {
				setLoading(false);
			}
		};

		query();
	}, []);

	const navTo = (endpoint) => {
		router.push(`/app/tray/${endpoint}`);
	};

	return (
		<AppLayout>
			<h4 className="text-3xl mb-2">All Trays</h4>
			{loading && <Spinner size="3x" />}
			{!loading && fail && <Message warning={true}>{fail}</Message>}
			{!loading && trays.length > 0 && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{trays.map((tray) => (
						<Card isButton="true" onClick={(e) => navTo(tray.endpoint)} key={tray.endpoint}>
							<div className="text-primary uppercase">
								<strong>{tray.deepFreeze ? "Deep" : "Quick"}</strong> Freeze
							</div>
							<h5 className="text-xl">{tray.name}</h5>
							<div className="mt-6">{formatBytesWithLabel(tray.total_bytes)}</div>
							<div className="mt-2">
								{(tray.ice_cubes && tray.ice_cubes.length) || 0} ice cube{tray.ice_cubes.length === 1 ? "" : "s"}
							</div>
							{tray.profile.usage_limits.customExpirationLimit && tray.custom_expiration_limit ? (
								<div className="mt-2">
									{tray.expiration_limit || tray.profile.usage_limits.expirationLimit} day retention
								</div>
							) : (
								<div className="mt-2">{tray.profile.usage_limits.expirationLimit} day retention</div>
							)}
						</Card>
					))}
				</div>
			)}
			{!loading && trays.length === 0 && (
				<div className="text-lg">
					You don't any trays.{" "}
					<Link href="/app/tray/new">
						<a className="underline text-primary">Create a tray here</a>
					</Link>{" "}
					to get started!
				</div>
			)}
		</AppLayout>
	);
}
