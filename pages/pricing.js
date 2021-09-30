import Container from "@/atoms/Container";
import SmallHeader from "@/atoms/SmallHeader";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import HorizontalHeader from "@/components/framing/HorizontalHeader";
import Message from "@/components/Message";
import PricingTable from "@/components/PricingTable";
import { useRouter } from "next/dist/client/router";
// import { supabase } from "@/services/supabase";

export default function Pricing({}) {
	const router = useRouter();

	const getStarted = (planId) => {
		console.log("get started with", planId);
		router.replace(`/sign-up?plan=${planId}`);
	};

	return (
		<FullScreenLayout>
			<HorizontalHeader />
			<section className="pt-4 pb-8 px-4 relative">
				<Container padding="px-4">
					<header>
						<SmallHeader>Pricing</SmallHeader>
						<div className="text-3xl mb-4">Simple and straightforward pricing</div>
					</header>
					<div>
						<PricingTable type="dark" setSelected={getStarted} />
					</div>
				</Container>
			</section>
		</FullScreenLayout>
	);
}

// export async function getServerSideProps(context) {
// 	let pricingData;
// 	console.log("SUPABASE", supabase);

// 	try {
// 		const { data, error } = await supabase.from("products").select("*").eq("active", true).order("price", { ascending: true });
// 		if (error) {
// 			throw error;
// 		}

// 		pricingData = data;
// 	} catch (err) {}

// 	return {
// 		props: { pricingData },
// 	};
// }
