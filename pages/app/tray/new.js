import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/atoms/form/Input";
import Card from "@/atoms/Card";
import Button from "@/atoms/Button";
import Checkbox from "@/atoms/form/Checkbox";
import Select from "@/atoms/form/Select";
import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";

export default function NewTray({ expiration }) {
	const [validEndpoint, setValidEndpoint] = useState("");
	const regexTerm = new RegExp(/[!@#$%^&*(),.?":{}|<>/]/);

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
		onSubmit: (values) => {
			console.log(values);
		},
	});

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

	const getExpirationDetails = () => {
		const numberOfDays = expiration.to - expiration.from;
		if (numberOfDays === 0) {
			return [{ value: 15, label: "15 days" }];
		} else {
			return Array.from(new Array(numberOfDays)).map((empty, i) => ({ value: i + 1, label: `${i + 1} day${i + 1 > 1 ? "s" : ""}` }));
		}
	};

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
						// disabled if account is free
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
						{getExpirationDetails().map((opt) => (
							<option value={opt.value} key={opt.value}>
								{opt.label}
							</option>
						))}
					</Select>
					<Button type="submit" color="primary">
						Create Tray
					</Button>
				</form>
			</Card>
		</AppLayout>
	);
}

export async function getServerSideProps(context) {
	const expiration = { from: 15, to: 15 };
	return {
		props: { expiration },
	};
}
