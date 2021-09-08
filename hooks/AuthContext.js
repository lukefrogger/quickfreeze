import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const clearUser = () => {
		setUser(null);
	};

	useEffect(() => {
		const session = supabase.auth.session();
		setSession(session);
		setUser(session?.user ?? null);
		console.log("direct", session);
		setLoading(false);

		const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log("change", session);
			setSession(session);
			setUser(session?.user ?? null);
			setLoading(false);
		});

		return () => {
			authListener.unsubscribe();
		};
	}, []);

	return <AuthContext.Provider value={{ user, loading, clearUser, session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error(`useAuth must be used within a AuthProvider.`);
	}
	return context;
};
