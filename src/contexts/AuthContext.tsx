import { supabase } from '@/services/supabaseClient';
import { type Children } from '@/shared/interfaces/Children';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { getUserInformation, selectUsers } from '@/utils/supabase';
import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
	session?: boolean;
	user: {
		email: string;
		name: string;
		username: string;
		bio: string;
		image: string;
		twitter: string;
		github: string;
		youtube: string;
		website: string;
		isCreator: boolean;
		isVerified: boolean;
	};
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: Children) {
	const [session, setSession] = useState<{ isLoggedIn?: boolean; user: UserProfile } | null>(null);

	useEffect(() => {
		async function initializeAsync() {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session) return;

			const [users, user] = await Promise.all([
				selectUsers(),
				getUserInformation(session?.user?.user_metadata?.user_name),
			]);

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

			setSession({ isLoggedIn: !!session.access_token, user: user.data?.[0] });
		}

		initializeAsync();
	}, []);

	if (!session) return <>{children}</>;

	return (
		<AuthContext.Provider
			value={{
				session: session?.isLoggedIn,
				user: {
					email: session?.user.email,
					name: session?.user.name,
					username: session?.user.username,
					bio: session?.user.bio,
					image: session?.user.avatar_url,
					twitter: session?.user.twitter,
					github: session?.user.github,
					youtube: session?.user.youtube,
					website: session?.user.website,
					isCreator: session?.user.is_creator,
					isVerified: session?.user.is_verified,
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
