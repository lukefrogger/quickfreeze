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

export default function Login() {
	const router = useRouter();
	const [failed, setFailed] = useState(false);
	const formik = useFormik({
		initialValues: {
			first: "",
			last: "",
			email: "",
			password: "",
			agreeToTerms: false,
		},
		validationSchema: Yup.object({
			first: Yup.string().required("First name required"),
			last: Yup.string().required("Last name required"),
			password: Yup.string().min(8, "Password is too short - should be 8 characters minimum.").required("A password is required"),
			email: Yup.string().email("Invalid email address").required("An email is required"),
			agreeToTerms: Yup.boolean().required("You must agree to the terms").oneOf([true], "You must agree to the terms"),
		}),
		onSubmit: (values) => {
			console.log(values);
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
							<div className="text-3xl text-center mb-2">Create an account</div>
						</header>
						<form onSubmit={formik.handleSubmit} noValidate>
							<Input
								type="text"
								name="first"
								label="First Name"
								value={formik.values.first}
								onChange={formik.handleChange}
								error={formik.touched.first && formik.errors.first}
							/>
							<Input
								type="text"
								name="last"
								label="Last Name"
								value={formik.values.last}
								onChange={formik.handleChange}
								error={formik.touched.last && formik.errors.last}
							/>
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
							<Checkbox
								small={true}
								name="agreeToTerms"
								required={true}
								value={formik.values.agreeToTerms}
								onChange={formik.handleChange}
								error={formik.touched.agreeToTerms && formik.errors.agreeToTerms}
							>
								I agree to the{" "}
								<a href="/terms-of-use" target="_blank" className="underline">
									terms of use
								</a>{" "}
								and{" "}
								<a href="/privacy-policy" target="_blank" className="underline">
									privacy policy
								</a>
							</Checkbox>
							<Button color="primary" custom={{ type: "submit" }} full={true}>
								Get Started
							</Button>
						</form>
					</div>
					<div className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-4 text-center text-gray-400">
						Already have an account?{" "}
						<Link href="/login" passHref>
							<a className="underline">Sign in</a>
						</Link>
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}
