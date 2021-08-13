import Head from "next/head";
import Container from "../atoms/container";

export default function FullScreenLayout({ children }) {
	return (
		<>
			<Head>
				<title>Quick Freeze | Temporary Database & Document Store</title>
				<link rel="icon" href="/icon.png" />
			</Head>
			<main className="bg-bDark text-white min-h-screen">
				<Container>{children}</Container>
			</main>
		</>
	);
}
