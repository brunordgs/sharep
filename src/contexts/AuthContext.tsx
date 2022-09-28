import { supabase } from '@/services/supabaseClient';
import { Children } from '@/shared/interfaces/Children';
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
	session: boolean;
	user: {
		name: string;
		username: string;
		image: string;
		email: string;
	};
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: Children) {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		async function initializeAsync() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) return;

			const users = await supabase.from('users').select();
			const usernames = users.data?.map(({ username }) => username);

			if (!usernames?.includes(session?.user?.user_metadata.user_name)) {
				await supabase.from('users').insert([
					{
						name: session?.user?.user_metadata?.full_name,
						username: session?.user?.user_metadata?.user_name,
						avatar_url: session?.user?.user_metadata?.avatar_url,
						email: session?.user?.user_metadata?.email,
					},
				]);
			}

			setSession(session);
		}

		initializeAsync();
	}, []);

	const {
		avatar_url: image,
		full_name: name,
		user_name: username,
		preferred_username: preferredUsername,
		email,
	} = session?.user?.user_metadata ?? {};

	console.log(session);

	return (
		<AuthContext.Provider
			value={{
				session: !!session?.access_token,
				user: {
					name,
					username: username ?? preferredUsername,
					image,
					email,
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
