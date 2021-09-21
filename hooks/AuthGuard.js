import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export function AuthGuard({ children }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.replace(`/login?redirect=${router.route}`);
		}
	}, [loading, user]);

	if (loading || (!loading && !user)) {
		return <div className="absolute top-0 left-0 w-screen h-screen"></div>;
	}

	return children;
}
