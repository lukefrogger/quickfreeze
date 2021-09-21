import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/atoms/Button";
import Container from "@/atoms/Container";
import Checkbox from "@/atoms/form/Checkbox";
import Input from "@/atoms/form/Input";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import HorizontalHeader from "@/components/framing/HorizontalHeader";
import Message from "@/components/Message";
import { useFormik } from "formik";
import * as Yup from "yup";
import { supabase } from "@/services/supabase";

export default function SignUp() {
	const router = useRouter();
	const [failed, setFailed] = useState(false);
	const [loading, setLoading] = useState(false);

	const createProfile = async (user, firstName, lastName, agreeToTerms, session) => {
		try {
			const { error } = await supabase
				.from("profiles")
				.insert({ id: user.id, email: user.email, firstName, lastName, agreeToTerms, updated_at: new Date() });
			if (error) {
				throw error;
			}

			// TODO: test sign up
			const { data: prods } = await supabase.from("products").select("*").match({ name: "Free", active: true });
			const { error: subError } = await supabase.from("subscriptions").insert({
				user_id: user.id,
				product_id: prods ? prods[0].id : null,
				status: "active",
			});
			if (subError) {
				throw subError;
			}
			const { error: uError } = await supabase.from("usage_limits").insert({
				numOfTrays: prods[0].numOfTrays,
				traySize: prods[0].traySize,
				deepFreeze: prods[0].deepFreeze,
				expirationLimit: prods[0].expirationLimit,
				customExpirationLimit: prods[0].customExpirationLimit,
				product: prods[0].id,
			});
			if (uError) {
				throw uError;
			}
		} catch (err) {
			console.error("fail on profilec creation", err);
			throw err;
		}
	};

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
		onSubmit: async (values) => {
			setLoading(true);

			try {
				const { user, session, error } = await supabase.auth.signUp({
					email: values.email,
					password: values.password,
					redirectTo: `${window.location.origin}/app/`,
				});
				if (error) {
					throw error;
				}
				const { data } = await supabase.from("profiles").select("id");
				if (data && data.length === 0) {
					await createProfile(user, values.first, values.last, values.agreeToTerms, session);
				}

				// TODO: forward to billing if they selected a price
				// if(window.location.search) {
				// 	router.push('/app/billling');
				// }
				router.push("/app");
			} catch (err) {
				console.error(err);
				setFailed(err);
			} finally {
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
							{failed && (
								<div className="mb-4">
									<Message warning={true}>
										{failed.message ? (
											<span>{failed.message}</span>
										) : (
											<span>
												<strong>Oh no!</strong> We weren't able to save your information.
											</span>
										)}
									</Message>
								</div>
							)}
							<Button color="primary" custom={{ type: "submit" }} full={true} loading={loading}>
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
