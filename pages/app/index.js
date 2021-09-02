import AppHeader from "../../components/AppHeader";
import FullScreenLayout from "../../components/FullScreenLayout";

export default function Home({ topThreetrays }) {
	return (
		<FullScreenLayout>
			<AppHeader />
		</FullScreenLayout>
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
