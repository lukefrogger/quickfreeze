import AppLayout from "@/components/layouts/AppLayout";
import Card from "@/atoms/Card";
import Link from "next/link";

export default function Home({ trays }) {
	return (
		<AppLayout>
			<h4 className="text-3xl mb-2">All Trays</h4>
			{trays && trays.length > 0 ? (
				<Card>stuff goes here</Card>
			) : (
				<div className="text-lg">
					You don't any trays.{" "}
					<Link href="/app/tray/new">
						<a className="underline text-primary">Create a tray here</a>
					</Link>{" "}
					to get started!
				</div>
			)}
		</AppLayout>
	);
}

export async function getServerSideProps(context) {
	const trays = [];

	return {
		props: { trays },
	};
}
