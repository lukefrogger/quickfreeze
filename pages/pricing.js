import Container from "../atoms/container";
import { SmallHeader } from "../atoms/smallHeader";
import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
import PricingTable from "../components/PricingTable";

export default function Pricing() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="pt-12 pb-8 px-4 relative">
				<Container padding="px-4">
					<header>
						<SmallHeader>Pricing</SmallHeader>
						<div className="text-3xl mb-4">Simple and straightforward pricing</div>
					</header>
					<div>
						<PricingTable type="dark" />
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}
