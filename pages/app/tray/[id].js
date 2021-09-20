import Button from "@/atoms/Button";
import Card from "@/atoms/Card";
import SmallHeader from "@/atoms/SmallHeader";
import InlineCardField from "@/components/InlineForm/InlineCardField";
import InlineText from "@/components/InlineForm/InlineText";
import AppLayout from "@/components/layouts/AppLayout";
import Message from "@/components/Message";
import Modal from "@/components/Modal";
import { supabase } from "@/services/supabase";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatBytes, formatBytesWithLabel } from "scripts/parseBytes";

export default function Tray() {
	const router = useRouter();
	const [fail, setFail] = useState(false);
	const [tray, setTray] = useState({});
	const [icon, setIcon] = useState(faCopy);
	const [deleteFail, setDeleteFail] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	useEffect(() => {
		if (router.query.id) {
			setFail(false);
			const query = async () => {
				try {
					const { data, error } = await supabase
						.from("trays")
						.select("*, ice_cubes (size), profile (id, usage_limits (*))")
						.eq("endpoint", router.query.id);
					if (error) {
						throw error;
					}

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
			setTray({ ...tray, [key]: value });
		} catch (err) {
			setFail(err.message || "The changes to your tray could not be saved");
		}
	};

	const deleteTray = async (answer) => {
		if (answer === "accept") {
			try {
				const { error: cubeError } = await supabase.from("ice_cubes").delete().eq("tray", tray.id);
				if (cubeError) {
					throw cubeError;
				}

				const { error: trayError } = await supabase.from("trays").delete().eq("id", tray.id);
				if (trayError) {
					throw trayError;
				}
			} catch (err) {
				console.error(err);
				setDeleteFail(err.message || "There was a problem deleting this tray");
			}
			router.replace("/app/");
		}
		setShowDeleteConfirm(false);
	};

	return (
		<AppLayout>
			<SmallHeader>Tray</SmallHeader>
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
				<>
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
							<InlineText label="Ice Cubes" value={(tray.ice_cubes && tray.ice_cubes.length) || 0} />
							{tray.profile && tray.profile.usage_limits && (
								<InlineText
									label="Bucket Size"
									value={`${formatBytes(tray.total_bytes)} / ${formatBytesWithLabel(tray.profile.usage_limits.traySize)}`}
								/>
							)}
							<InlineText label="Data Retention" value={`${tray.expirationLimit} days`} />
						</div>
					</Card>
					<Card className="mt-4">
						<SmallHeader>Danger Zone</SmallHeader>
						{deleteFail && (
							<div className="mt-4">
								<Message warning={true}>{deleteFail}</Message>
							</div>
						)}
						<div className="flex flex-col">
							{!deleteFail && (
								<div className="mt-4">
									<Message warning={true}>
										Deleting this tray will delete all the ice cubes within it and cannot be undone.
									</Message>
								</div>
							)}
							<div className="mt-4">
								<Button color="danger" onClick={() => setShowDeleteConfirm(true)}>
									Delete Tray
								</Button>
							</div>
						</div>
					</Card>
					<Modal
						continueText="Delete"
						modalClose={(answer) => deleteTray(answer)}
						visible={showDeleteConfirm}
						title="Delete a Tray"
						type="danger"
					>
						Are you sure you want to delete this tray? All data realted to it will be immediately deleted.
					</Modal>
				</>
			)}
		</AppLayout>
	);
}
