import Card from "@/atoms/Card";
import SmallHeader from "@/atoms/SmallHeader";
import InlineCardField from "@/components/InlineForm/InlineCardField";
import InlineText from "@/components/InlineForm/InlineText";
import AppLayout from "@/components/layouts/AppLayout";
import Message from "@/components/Message";
import { supabase } from "@/services/supabase";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parseBytes from "scripts/parseBytes";

export default function Tray() {
	const router = useRouter();
	const [fail, setFail] = useState(false);
	const [tray, setTray] = useState({});
	const [icon, setIcon] = useState(faCopy);

	useEffect(() => {
		if (router.query.id) {
			setFail(false);
			const query = async () => {
				try {
					const { data, error } = await supabase.from("trays").select("*, ice_cubes (size)").eq("endpoint", router.query.id);
					if (error) {
						throw error;
					}
					console.log(data[0]);
					setTray(data[0]);
				} catch (err) {
					console.log(err);
					setFail(err.message || "You're trays couldn't be found");
				}
			};

			query();
		}
	}, [router.query.id]);

	const copyEndpoint = () => {
		navigator.clipboard.writeText(`https://quickfreeze.io/api/iceCubes/${tray.endpoint}`);
		setIcon(faCheck);
		setTimeout(() => {
			setIcon(faCopy);
		}, 3000);
	};

	const saveChange = async (value, key) => {
		try {
			const { data, error } = await supabase
				.from("trays")
				.update({ [key]: value })
				.match({ profile: supabase.auth.currentUser.id, endpoint: tray.endpoint });

			if (error) {
				throw error;
			}
			setTray(data[0]);
		} catch (err) {
			setFail(err.message || "The changes to your tray could not be saved");
		}
	};

	return (
		<AppLayout>
			<SmallHeader>bucket</SmallHeader>
			<h4 className="text-3xl mb-2">{tray.name || router.query.id}</h4>
			<div className="flex relative mb-6">
				<div>Endpoint:</div>
				<div className="text-primary cursor-pointer flex" onClick={copyEndpoint}>
					&nbsp; /{tray.endpoint || router.query.id}
					{tray.endpoint && (
						<span className="ml-1 flex">
							<FontAwesomeIcon icon={icon} size="sm" />
						</span>
					)}
				</div>
			</div>
			{tray && (
				<Card>
					<SmallHeader>Details</SmallHeader>
					{fail && (
						<div className="mt-4">
							<Message warning={true}>{fail}</Message>
						</div>
					)}
					<div className="flex flex-wrap">
						<InlineCardField initialValue={tray.name} label="Name" saveChange={(value) => saveChange(value, "name")} />
						<InlineText label="Freeze Option" value={tray.deepFreeze ? "Deep Freeze" : "Quick Freeze"} />
						<InlineText label="Ice Cubes" value={`${tray.ice_cubes && tray.ice_cubes.length} ice cubes`} />
						<InlineText label="Bucket Size" value={parseBytes(tray.total_bytes)} />
						<InlineText label="Data Retention" value={`${tray.expirationLimit} days`} />
					</div>
				</Card>
			)}
		</AppLayout>
	);
}
