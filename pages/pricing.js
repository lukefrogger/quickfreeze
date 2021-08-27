import Container from "../atoms/container";
import SmallHeader from "../atoms/SmallHeader";
import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
import Message from "../components/Message";
import PricingTable from "../components/PricingTable";

export default function Pricing() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="pt-4 pb-8 px-4 relative">
				<Container padding="px-4">
					<header>
						<SmallHeader>Pricing</SmallHeader>
						<div className="text-3xl mb-4">Simple and straightforward pricing</div>
					</header>
					<div className="my-6">
						<Message>
							<strong>Quick Freeze is still under development.</strong> To stay up to date, sign up and we'll keep you updated
							with the lastest information.
						</Message>
					</div>
					<div>
						<PricingTable type="dark" />
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}
