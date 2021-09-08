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

export default function NewTray() {
	const [validEndpoint, setValidEndpoint] = useState("");
	const regexTerm = new RegExp(/[!@#$%^&*(),.?":{}|<>/]/);
	const [fail, setFail] = useState(false);
	const [loading, setLoading] = useState(false);
	const [limits, setLimits] = useState(false);
	const [expirationLimits, setExpirationLimits] = useState([]);

	const getLimits = async () => {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select(
					"id, subscriptions( id, status, product ( deepFreeze, numOfTrays, customExpirationLimit, expirationLimit) ), trays (id) email"
				);
			if (error) {
				throw error;
			}

			const profile = data[0];
			const activeSub = profile.subscriptions.find((item) => item.status === "active");
			setLimits({
				traysLeft: activeSub.product.numOfTrays - profile.trays.length,
				customExpiration: activeSub.product.customExpirationLimit,
				expirationLimit: activeSub.product.expirationLimit,
				deepFreeze: activeSub.product.deepFreeze,
			});
		} catch (err) {
			console.log("erro on limit fetch", err);
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
				const data = await getLimits();
				if (!data) {
					throw data;
				}
				console.log(data);
				// console.log(values);
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

	const validateEndpoint = (text) => {
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
		if (formik.values.endpoint) {
			validateEndpoint(formik.values.endpoint);
		}
	}, [formik.values.endpoint]);

	useEffect(() => {
		if (limits) {
			console.log(limits);
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
						label="Days until Expired"
						value={formik.values.expiration}
						onChange={formik.handleChange}
						helpText="Select the length of days between when a record is added and when it will automatically be deleted."
					>
						<option>-- Select --</option>
						{expirationLimits.map((opt) => (
							<option value={opt.value} key={opt.value}>
								{opt.label}
							</option>
						))}
					</Select>
					{fail && (
						<div className="mb-4">
							<Message warning={true}>{fail}</Message>
						</div>
					)}
					<Button type="submit" color="primary" loading={loading}>
						Create Tray
					</Button>
				</form>
			</Card>
		</AppLayout>
	);
}
