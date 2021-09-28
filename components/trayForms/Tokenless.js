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
import { uniqueNamesGenerator, adjectives, colors, animals, starWars, names } from "unique-names-generator";

export default function Tokenless({ expirationLimits, limits }) {
	const [uniqueEndpoint, setUniqueEndpoint] = useState("");
	const [loading, setLoading] = useState(false);
	const [fail, setFail] = useState(false);

	useEffect(() => {
		newEndpoint();
	}, []);

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
					unique_endpoint: true,
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

	const newEndpoint = () => {
		const uniqueString = uniqueNamesGenerator({
			dictionaries: [colors, adjectives, animals, starWars, names],
			separator: "_",
			length: "3",
		});
		setUniqueEndpoint(uniqueString);
		formik.setFieldValue("endpoint", uniqueString);
	};

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
				<div className="flex">
					<div className="flex-1">
						<Input
							type="text"
							name="endpoint"
							label="Tray Endpoint"
							helpText="Endpoints for tokenless trays are auto-generated"
							value={uniqueEndpoint}
							error={formik.touched.endpoint && formik.errors.endpoint}
							disabled={true}
						/>
					</div>
					<div className="ml-2 mt-7">
						<Button type="outline" color="primary" custom={{ type: "button" }} onClick={newEndpoint}>
							Generate
						</Button>
					</div>
				</div>
				<h4 className="mb-2 mt-2 text-primary font-bold uppercase">Data Settings</h4>
				<Checkbox
					name="deepFreeze"
					value={formik.values.deepFreeze}
					onChange={formik.handleChange}
					error={formik.touched.deepFreeze && formik.errors.deepFreeze}
					disabled={!limits.deepFreeze}
					helpText="Data can be read from a tray as many times as needed"
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
