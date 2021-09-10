import Button from "@/atoms/Button";
import Card from "@/atoms/Card";
import Input from "@/atoms/form/Input";
import Select from "@/atoms/form/Select";
import SmallHeader from "@/atoms/SmallHeader";
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
	const [updateLoading, setUpdateLoading] = useState({});

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
					console.log(data[0]);
					setTray(data[0]);
					setChanges({});
					setUpdateLoading({});
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

	const changeValue = (key, value) => {
		if (tray[key] === value) {
			setChanges({
				...changes,
				[key]: false,
			});
			return;
		}
		setChanges({
			...changes,
			[key]: value,
		});
	};

	const saveChange = async (key) => {
		try {
			setUpdateLoading({
				...loading,
				[key]: true,
			});
			const { data, error } = await supabase
				.from("trays")
				.update({ [key]: changes[key] })
				.match({ profile: supabase.auth.currentUser.id, endpoint: tray.endpoint });

			if (error) {
				throw error;
			}

			setChanges({
				...changes,
				[key]: false,
			});
			setUpdateLoading({
				...loading,
				[key]: false,
			});
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
						<div className="flex flex-wrap w-full mt-4">
							<div className="lg:mb-4 flex items-center w-full lg:w-1/4">Name</div>
							<div className="flex w-full lg:w-3/4">
								<div className="flex-1">
									<Input
										value={changes.name || tray.name || ""}
										type="text"
										onChange={(e) => changeValue("name", e.target.value)}
									/>
								</div>
								<div className="w-32 mb-3 flex justify-end items-center">
									<div className={`${changes.name ? "block" : "hidden"}`}>
										<Button color="primary" onClick={() => saveChange("name")} loading={updateLoading.name}>
											Save
										</Button>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-wrap w-full mt-4">
							<div className="lg:mb-4 flex items-center w-full lg:w-1/4">Freeze Option</div>
							<div className="flex w-full lg:w-3/4">
								<div className="flex-1">
									<Select
										onChange={(e) => changeValue("deepFreeze", e.target.value)}
										value={changes.deepFreeze || tray.deepFreeze}
									>
										<option value={false}>Quick Freeze</option>
										<option value={true}>Deep Freeze</option>
									</Select>
								</div>
								<div className="w-32 mb-3 flex justify-end items-center">
									<div className={`${changes.deepFreeze ? "block" : "hidden"}`}>
										<Button color="primary" onClick={() => saveChange("deepFreeze")} loading={updateLoading.deepFreeze}>
											Save
										</Button>
									</div>
								</div>
							</div>
						</div>
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
function TrayFields({ field, name, button }) {
	return (
		<div className="flex flex-wrap w-full mt-4">
			<div className="lg:mb-4 flex items-center w-full lg:w-1/4">{name}</div>
			<div className="flex w-full lg:w-3/4">
				<div className="flex-1">{field}</div>
				<div className="w-32 mb-3 flex justify-end items-center">{button}</div>
			</div>
		</div>
	);
}
