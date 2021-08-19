import Button from "../atoms/Button";
import Container from "../atoms/container";
import Input from "../atoms/form/Input";
import { SmallHeader } from "../atoms/smallHeader";
import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
import Message from "../components/Message";

export default function SignUp() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="mt-4">
				<Container>
					<div className="w-full md:w-1/2 mx-auto mb-8">
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
						<form>
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
