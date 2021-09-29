import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/AuthContext";
import "../styles/index.css";

// export function reportWebVitals(metric) {
// 	console.log(metric);
// }

function HomePage({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
				page_path: url,
			});
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default HomePage;
