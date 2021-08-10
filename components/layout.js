import Head from "next/head";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<title>Quick Freeze</title>
				<link rel="icon" href="/icon.png" />
			</Head>
			<main className="flex flex-row bg-gray-800 text-white">
				<Sidebar />
				{children}
			</main>
		</>
	);
}
