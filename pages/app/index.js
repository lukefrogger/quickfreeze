import Link from "next/link";
import Button from "../../atoms/Button";
import SidebarLayout from "../../components/SidebarLayout";

export default function Home({ topThreetrays }) {
	return (
		<SidebarLayout topThree={topThreetrays}>
			<div className="flex justify-between">
				<h2 className="text-2xl">All trays</h2>
				<div>
					<Link href="app/tray/new" passHref>
						<Button color="primary">New Tray</Button>
					</Link>
				</div>
			</div>
		</SidebarLayout>
	);
}

export async function getServerSideProps(context) {
	const topThreetrays = [
		{ name: "test 1", link: "/test1", deepFreeze: false, size: 3209 },
		{ name: "Byoplanet test 1", link: "/byoplanet1", deepFreeze: false, size: 8340 },
		{ name: "Salesforce migration - byoplanet", link: "/salesforcemig", deepFreeze: true, size: 32_420 },
	];
	return {
		props: { topThreetrays },
	};
}
