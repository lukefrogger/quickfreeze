import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/atoms/form/Input";
import Card from "@/atoms/Card";
import Button from "@/atoms/Button";
import Checkbox from "@/atoms/form/Checkbox";
import Select from "@/atoms/form/Select";
import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import Message from "@/components/Message";
import Link from "next/link";
import router from "next/router";

export default function NewTray() {
	const [validEndpoint, setValidEndpoint] = useState("");
	const regexTerm = new RegExp(/[!@#$%^&*(),.?":{}|<>/]/);
	const [fail, setFail] = useState(false);
	const [loading, setLoading] = useState(false);
	const [limits, setLimits] = useState(false);
	const [expirationLimits, setExpirationLimits] = useState([]);

	const getLimits = async (returnData) => {
		console.log(supabase.auth);
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select(
					"id, subscriptions( id, status, product ( deepFreeze, numOfTrays, customExpirationLimit, expirationLimit) ), trays (id, endpoint)"
				);
			if (error) {
				throw error;
			}
			if (data.length === 0) {
				return setFail("There was a problem getting your account information.");
			}

			const profile = data[0];
			const activeSub = profile.subscriptions.find((item) => item.status === "active");
			const temp = {
				traysLeft: activeSub.product.numOfTrays - profile.trays.length,
				customExpiration: activeSub.product.customExpirationLimit,
				expirationLimit: activeSub.product.expirationLimit,
				deepFreeze: activeSub.product.deepFreeze,
			};

			if (returnData) {
				return { ...temp, trays: profile.trays };
			}

			setLimits(temp);
		} catch (err) {
			console.log("error on limit fetch", err);
			return false;
		}
	};

	const formik = useFormik({
		initialValues: {
			name: "",
			endpoint: "",
			deepFreeze: false,
			expiration: 0,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Tray name required"),
			endpoint: Yup.string().required("An endpoint is required"),
			deepFreeze: Yup.boolean(),
			expiration: Yup.string().required("You must select an expiration timeframe"),
		}),
		onSubmit: async (values) => {
			setFail(false);
			setLoading(true);
			try {
				const limit = await getLimits(true);
				if (!limit) {
					throw limit;
				}
				console.log(limit);
				console.log(values);

				if (values.deepFreeze && !limit.deepFreeze) {
					throw { message: "You're subscription doesn't have access to Deep Freeze" };
				} else if (limit.traysLeft <= 0) {
					throw { message: "You are using the maximum number of trays in your subscription" };
				} else if (limit.trays.find((item) => item.endpoint === values.endpoint)) {
					throw { message: "You've already used this endpoint" };
				} else if (values.expiration === "") {
					throw { message: "You must select an expiration timeframe" };
				}

				const { data, error } = await supabase.from("trays").insert({
					profile: supabase.auth.currentUser.id,
					name: values.name,
					endpoint: values.endpoint,
					deepFreeze: values.deepFreeze,
					expirationLimit: values.expiration,
					total_bytes: 0,
				});
				if (error) {
					throw error;
				}
				console.log("created", data);
				router.replace("/app/tray/" + data.id);
			} catch (err) {
				console.log("ERROR", err);
				setFail(err.message ? err.message : "There has been a problem while saving your new tray");
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		getLimits();
	}, []);

	const validateEndpoint = async (text) => {
		let newText = "";
		for (let letter of Array.from(text)) {
			if (regexTerm.test(letter) === true) {
				console.log("failed");
			} else if (letter === " ") {
				newText += "_";
			} else {
				newText += letter;
			}
		}
		formik.setFieldValue("endpoint", newText);
		setValidEndpoint(newText);
	};

	useEffect(() => {
		validateEndpoint(formik.values.endpoint || "");
	}, [formik.values.endpoint]);

	useEffect(() => {
		if (limits) {
			if (!limits.customExpiration) {
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
			<Card>
				{fail && (
					<div className="mb-4">
						<Message warning={true}>{fail}</Message>
					</div>
				)}
				<h4 className="mb-2 text-primary font-bold uppercase">Tray Details</h4>
				<form onSubmit={formik.handleSubmit} noValidate>
					<Input
						type="text"
						name="name"
						label="Tray Name"
						value={formik.values.trayName}
						onChange={formik.handleChange}
						error={formik.touched.name && formik.errors.name}
					/>
					<Input
						type="text"
						name="endpoint"
						label="Tray Endpoint"
						helpText="The endpoint must be unique to your account and URL safe."
						value={validEndpoint}
						onChange={formik.handleChange}
						error={formik.touched.endpoint && formik.errors.endpoint}
					/>
					<h4 className="mb-2 mt-6 text-primary font-bold uppercase">Data Settings</h4>
					<Checkbox
						name="deepFreeze"
						value={formik.values.deepFreeze}
						onChange={formik.handleChange}
						error={formik.touched.deepFreeze && formik.errors.deepFreeze}
						disabled={!limits.deepFreeze}
						helpText="Data can be stored for as long as needed and read from a tray as many times as needed"
					>
						Use Deep Freeze
					</Checkbox>
					<Select
						name="expiration"
						label="Days until data expires"
						value={formik.values.expiration}
						onChange={formik.handleChange}
						helpText="Select the length of days between when a record is added and when it will automatically be deleted."
						error={formik.touched.expiration && formik.errors.expiration}
					>
						<option>-- Select --</option>
						{expirationLimits.map((opt) => (
							<option value={opt.value} key={opt.value}>
								{opt.label}
							</option>
						))}
					</Select>
					{limits.traysLeft === 0 ? (
						<Message>
							You have created the max number of trays that your subscription allows.{" "}
							<Link href="/app/account/">
								<a className="underline">Upgrade here</a>
							</Link>{" "}
							to create more.
						</Message>
					) : (
						<Button type="submit" color="primary" loading={loading}>
							Create Tray
						</Button>
					)}
				</form>
			</Card>
		</AppLayout>
	);
}
