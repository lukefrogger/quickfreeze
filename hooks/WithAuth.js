import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";

export default function withAuth(Component) {
	const user = useAuth();
	const router = useRouter();

	if (!loading && !user) {
		router.replace("/login");
	}

	return <Component />;
}
