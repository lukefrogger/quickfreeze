import SidebarLayout from "../../../components/SidebarLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../atoms/form/Input";
import Card from "../../../atoms/Card";
import Checkbox from "../../../atoms/form/Checkbox";
import Select from "../../../atoms/form/Select";

export default function NewTray({ topThree, expiration }) {
	const getExpirationDetails = () => {
		const numberOfDays = expiration.from - expiration.to;
		if (numberOfDays === 0) {
			return [{ value: 15, label: "15 days" }];
		} else {
			return new Array(numberOfDays).map((empty, i) => ({ value: i + 1, label: `${i + 1} day${i + 1 > 1 ? "s" : ""}` }));
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
			expiration: Yup.number().required("You must select an expiration timeframe"),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<SidebarLayout topThree={topThree}>
			<div className="max-w-xl">
				<div className="flex justify-between mb-8">
					<h2 className="text-2xl">Create a new tray</h2>
				</div>
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
							value={formik.values.endpoint}
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
							value={formik.values.expiration}
							helpText="Select the length of days between when the data is added and when it will be automatically be deleted."
						>
							{getExpirationDetails().map((opt) => (
								<option value={opt.value}>{opt.label}</option>
							))}
						</Select>
					</form>
				</Card>
			</div>
		</SidebarLayout>
	);
}

export async function getServerSideProps(context) {
	const topThree = [
		{ name: "test 1", link: "/test1", deepFreeze: false, size: 3209 },
		{ name: "Byoplanet test 1", link: "/byoplanet1", deepFreeze: false, size: 8340 },
		{ name: "Salesforce migration - byoplanet", link: "/salesforcemig", deepFreeze: true, size: 32_420 },
	];
	const expiration = { from: 15, to: 15 };
	return {
		props: { topThree, expiration },
	};
}
