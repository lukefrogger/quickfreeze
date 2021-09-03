import Link from "next/link";
import Container from "@/atoms/Container";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import HorizontalHeader from "@/components/layouts/HorizontalHeader";
import Message from "@/components/Message";

export default function SignUpComplete() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="mt-4">
				<Container>
					<div className="w-full md:w-1/2 mx-auto mb-8">
						<Message>
							<strong>Thanks for signing up!</strong> You should recieve an email soon.
						</Message>
						<div className="mt-8 text-xl">
							In the mean time, check out{" "}
							<Link href="/docs">
								<span className="underline text-primary cursor-pointer"> the docs</span>
							</Link>{" "}
							to familiarize yourself with how Quick Freeze works.
						</div>
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}
