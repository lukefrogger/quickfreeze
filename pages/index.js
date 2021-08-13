import FullScreenLayout from "../components/FullScreenLayout";
import HorizontalHeader from "../components/HorizontalHeader";
// import { connectToDatabase } from "../lib/mongodb";

export default function Home() {
	return (
		<FullScreenLayout>
			<HorizontalHeader />
		</FullScreenLayout>
	);
}

// export async function getStaticProps(context) {
// 	const { client } = await connectToDatabase();

// 	const isConnected = await client.isConnected();

// 	return {
// 		props: { isConnected },
// 	};
// }
