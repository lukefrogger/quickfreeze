import Layout from "../components/layout";
import { connectToDatabase } from "../lib/mongodb";

export default function Home({ isConnected }) {
	return (
		<Layout>
			<div>Body</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { client } = await connectToDatabase();

	const isConnected = await client.isConnected();

	return {
		props: { isConnected },
	};
}
