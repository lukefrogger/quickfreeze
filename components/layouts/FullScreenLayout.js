import Head from "next/head";
import Footer from "../framing/Footer";

export default function FullScreenLayout({ children }) {
	return (
		<>
			<Head>
				<title>Quick Freeze | Temporary Data store for webhooks</title>
				<link rel="icon" href="/icon.png" />
			</Head>
			<main className="text-white min-h-screen">{children}</main>
			<Footer />
		</>
	);
}
