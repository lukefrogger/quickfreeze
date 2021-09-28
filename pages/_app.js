import { AuthProvider } from "../hooks/AuthContext";
import "../styles/index.css";

// export function reportWebVitals(metric) {
// 	console.log(metric);
// }

function HomePage({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default HomePage;
