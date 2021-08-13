import SidebarLayout from "../../components/SidebarLayout";

export default function Home({ topThreeBuckets }) {
	return (
		<SidebarLayout topThree={topThreeBuckets}>
			<div>
				<h2 className="text-2xl">All Buckets</h2>
			</div>
		</SidebarLayout>
	);
}

export async function getStaticProps(context) {
	const topThreeBuckets = [
		{ name: "test 1", link: "/test1" },
		{ name: "Byoplanet test 1", link: "/byoplanet1" },
		{ name: "Salesforce migration - byoplanet", link: "/salesforcemig" },
	];
	return {
		props: { topThreeBuckets },
	};
}
