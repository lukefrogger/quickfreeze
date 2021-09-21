import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/atoms/Button";
import Container from "@/atoms/Container";
import Input from "@/atoms/form/Input";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import HorizontalHeader from "@/components/framing/HorizontalHeader";
import Message from "@/components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/AuthContext";
import { supabase } from "@/services/supabase";

export default function SignUp() {
	const router = useRouter();
	const auth = useAuth();
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (auth.user) {
			const redirect = router.query.redirect;
			router.replace(redirect ? redirect : "/app");
		}
	}, [auth.user]);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			password: Yup.string().required("A password is required"),
			email: Yup.string().email("Invalid email address").required("An email is required"),
		}),
		onSubmit: async (values) => {
			setLoading(true);
			setFailed(false);
			try {
				const { error } = await supabase.auth.signIn({
					email: values.email,
					password: values.password,
				});

				if (error) {
					throw error;
				}
			} catch (err) {
				console.error("fail on login", err);
				if (err.message) {
					setFailed(err.message);
				} else {
					setFailed(true);
				}
				setLoading(false);
			}
		},
	});
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="mt-4 mb-24">
				<Container>
					<div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-bLight p-8 mt-12 rounded-md border border-gray-500">
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
							{failed && (
								<div className="mb-4">
									<Message warning={true}>
										{failed === false ? (
											<span>
												<strong>Oh no!</strong> We weren't able to log you in.
											</span>
										) : (
											<span>{failed}</span>
										)}
									</Message>
								</div>
							)}
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
