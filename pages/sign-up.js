import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../atoms/Button";
import Container from "../atoms/container";
import Input from "../atoms/form/Input";
import { SmallHeader } from "../atoms/smallHeader";
import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
import Message from "../components/Message";

export default function SignUp() {
	const router = useRouter();
	const [failed, setFailed] = useState(false);

	const signUp = async (event) => {
		event.preventDefault();
		setFailed(false);
		const res = await fetch("/api/betaSignUp", {
			body: JSON.stringify({
				first: event.target.elements.first.value,
				last: event.target.elements.last.value,
				email: event.target.elements.email.value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const result = await res.json();
		if (result.success) {
			router.push("/sign-up-complete");
		} else {
			setFailed(true);
		}
		console.log(result);
	};
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="mt-4">
				<Container>
					<div className="w-full md:w-1/2 mx-auto mb-8">
						{failed && (
							<div className="mb-4">
								<Message warning={true}>
									<strong>Oh no!</strong> We weren't able to save your information.
								</Message>
							</div>
						)}
						<Message>
							<strong>Quick Freeze is still under development.</strong> If you'd like join the upcoming beta program, sign up
							and we'll keep you updated with newest details.
						</Message>
					</div>
					<div className="w-full md:w-1/2 mx-auto bg-bLight p-8 rounded border border-blueTrans">
						<header className="mb-8">
							<SmallHeader>Beta Program</SmallHeader>
							<div className="text-3xl text-center my-2 font-bold">
								Sign up below and you'll be the first to know when we're ready to launch
							</div>
						</header>
						<form onSubmit={signUp}>
							<Input type="text" name="first" label="First Name" />
							<Input type="text" name="last" label="Last Name" />
							<Input type="email" name="email" label="Email Address" />
							<Button color="primary" custom={{ type: "submit" }}>
								Submit
							</Button>
						</form>
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}
