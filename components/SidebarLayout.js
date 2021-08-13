import Head from "next/head";
import Sidebar from "./sidebar";

export default function SidebarLayout({ children, topThree }) {
	return (
		<>
			<Head>
				<title>Quick Freeze</title>
				<link rel="icon" href="/icon.png" />
			</Head>
			<main className="flex flex-row bg-bDark text-white">
				<Sidebar topThree={topThree} />
				<div className="container p-4 max-w-screen-lg">{children}</div>
			</main>
		</>
	);
}
