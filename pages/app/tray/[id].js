import Button from "@/atoms/Button";
import Card from "@/atoms/Card";
import Input from "@/atoms/form/Input";
import Select from "@/atoms/form/Select";
import SmallHeader from "@/atoms/SmallHeader";
import InlineCardField from "@/components/InlineForm/InlineCardField";
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
	const [loading, setLoading] = useState(false);
	const [fail, setFail] = useState(false);
	const [tray, setTray] = useState({});
	const [icon, setIcon] = useState(faCopy);
	const [changes, setChanges] = useState({});

	useEffect(() => {
		if (router.query.id) {
			setLoading(true);
			setFail(false);
			const query = async () => {
				try {
					const { data, error } = await supabase.from("trays").select("*").eq("endpoint", router.query.id);
					if (error) {
						throw error;
					}

					setTray(data[0]);
					setChanges({});
				} catch (err) {
					console.log(err);
					setFail(err.message || "You're trays couldn't be found");
				} finally {
					setLoading(false);
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
						<InlineCardField
							initialValue={tray.deepFreeze}
							label="Freeze Option"
							saveChange={(value) => saveChange(value, "deepFreeze")}
							type="select"
						/>
						<div className="flex flex-wrap w-full mt-4">
							<div className="lg:mb-4 flex items-center w-full lg:w-1/4">Ice Cubes</div>
							<div className="flex w-full lg:w-3/4">
								<div className="flex-1 font-bold">{0} ice cubes | Need to add this</div>
							</div>
						</div>
						<div className="flex flex-wrap w-full mt-4">
							<div className="lg:mb-4 flex items-center w-full lg:w-1/4">Bucket Size</div>
							<div className="flex w-full lg:w-3/4">
								<div className="flex-1 font-bold">{parseBytes(tray.total_bytes)}</div>
							</div>
						</div>
					</div>
				</Card>
			)}
		</AppLayout>
	);
}
