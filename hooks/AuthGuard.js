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

	return children;
}
