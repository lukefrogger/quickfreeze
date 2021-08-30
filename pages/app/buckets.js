import SidebarLayout from "../../components/SidebarLayout";

export default function Home({ topThreetrays }) {
	return (
		<SidebarLayout topThree={topThreetrays}>
			<div>
				<h2 className="text-2xl">All trays</h2>
			</div>
		</SidebarLayout>
	);
}

export async function getStaticProps(context) {
	const topThreetrays = [
		{ name: "test 1", link: "/test1" },
		{ name: "Byoplanet test 1", link: "/byoplanet1" },
		{ name: "Salesforce migration - byoplanet", link: "/salesforcemig" },
	];
	return {
		props: { topThreetrays },
	};
}
