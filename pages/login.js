import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../atoms/Button";
import Container from "../atoms/Container";
import Checkbox from "../atoms/form/Checkbox";
import Input from "../atoms/form/Input";
import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
import Message from "../components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
	const router = useRouter();
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(false);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			password: Yup.string().required("A password is required"),
			email: Yup.string().email("Invalid email address").required("An email is required"),
		}),
		onSubmit: (values) => {
			setLoading(true);
			console.log(values);
			setTimeout(() => {
				setLoading(false);
			}, 4000);
		},
	});
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="mt-4 mb-24">
				<Container>
					<div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-bLight p-8 mt-12 rounded border border-gray-500">
						{failed && (
							<div className="mb-4">
								<Message warning={true}>
									<strong>Oh no!</strong> We weren't able to save your information.
								</Message>
							</div>
						)}
						<header className="mb-8">
							<div className="text-3xl text-center mb-2">Log into your account</div>
						</header>
						<form onSubmit={formik.handleSubmit} noValidate>
							<Input
								type="email"
								name="email"
								label="Email Address"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && formik.errors.email}
							/>
							<Input
								type="password"
								name="password"
								label="Password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && formik.errors.password}
							/>
							<Button color="primary" custom={{ type: "submit" }} full={true} loading={loading}>
								Login
							</Button>
						</form>
					</div>
					<div className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-4 text-center text-gray-400">
						Need to create an account?{" "}
						<Link href="/sign-up" passHref>
							<a className="underline">Get Started Today</a>
						</Link>
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}
