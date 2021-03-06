import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/atoms/form/Input";
import Card from "@/atoms/Card";
import Button from "@/atoms/Button";
import Checkbox from "@/atoms/form/Checkbox";
import Select from "@/atoms/form/Select";
import router from "next/router";
import Message from "../Message";

export default function Standard({ expirationLimits, limits }) {
	const [validEndpoint, setValidEndpoint] = useState("");
	const [loading, setLoading] = useState(false);
	const [fail, setFail] = useState(false);
	const regexTerm = new RegExp(/[!@#$%^&*(),.?":{}|<>/]/);

	const formik = useFormik({
		initialValues: {
			name: "",
			endpoint: "",
			deepFreeze: false,
			expiration: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Tray name required"),
			endpoint: Yup.string().required("An endpoint is required"),
			deepFreeze: Yup.boolean(),
			expiration: Yup.string(),
		}),
		onSubmit: async (values) => {
			setFail(false);
			setLoading(true);
			try {
				console.log(values);

				if (values.deepFreeze && !limits.deepFreeze) {
					throw { message: "You're subscription doesn't have access to Deep Freeze" };
				} else if (limits.traysLeft <= 0) {
					throw { message: "You are using the maximum number of trays in your subscription" };
				} else if (limits.trays.find((item) => item.endpoint === values.endpoint)) {
					throw { message: "You've already used this endpoint" };
				} else if (limits.customExpirationLimit && (values.expiration === "" || values.expiration === 0)) {
					throw { message: "You must select an valid data retention setting" };
				}

				const newTray = {
					profile: supabase.auth.currentUser.id,
					name: values.name,
					endpoint: values.endpoint,
					deepFreeze: values.deepFreeze,
					custom_expiration_limit: !!values.expiration,
					total_bytes: 0,
					type: "standard",
				};
				if (values.expiration) {
					newTray.expiration_limit = values.expiration;
				}

				const { data, error } = await supabase.from("trays").insert(newTray);
				if (error) {
					throw error;
				}
				console.log("created", data[0]);
				router.replace("/app/tray/" + data[0].endpoint);
			} catch (err) {
				console.log("ERROR", err);
				setFail(err.message ? err.message : "There has been a problem while saving your new tray");
			} finally {
				setLoading(false);
			}
		},
	});

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

	return (
		<Card className="mt-4">
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
					helpText="Data can read from a tray as many times as needed"
				>
					Use Deep Freeze
				</Checkbox>
				{limits.customExpirationLimit && (
					<Select
						name="expiration"
						label="Data Retention"
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
				)}
				<Button type="submit" color="primary" loading={loading}>
					Create Tray
				</Button>
			</form>
		</Card>
	);
}
