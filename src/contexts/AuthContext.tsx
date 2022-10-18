import { supabase } from '@/services/supabaseClient';
import { type Children } from '@/shared/interfaces/Children';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { getSession, getUserInformation, selectUsers } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
	session?: Session;
	user: {
		name: string;
		username: string;
		bio: string;
		image: string;
		twitch: string;
		github: string;
		youtube: string;
		website: string;
		isCreator: boolean;
		isVerified: boolean;
	};
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: Children) {
	const [session, setSession] = useState<{ session: Session; user: UserProfile } | null>(null);

	useEffect(() => {
		async function initializeAsync() {
			const {
				data: { session },
			} = await getSession();

			if (!session) return;

			// Only use this variable to check username provided by normal sign in/sign up methods
			const username =
				session?.user?.user_metadata?.user_name ?? session?.user?.user_metadata?.username;

			const [users, user] = await Promise.all([selectUsers(), getUserInformation(username)]);

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

			setSession({ session, user: user.data![0] });
		}

		initializeAsync();
	}, []);

	if (!session) return <>{children}</>;

	return (
		<AuthContext.Provider
			value={{
				session: session?.session,
				user: {
					name: session?.user.name,
					username: session?.user.username,
					bio: session?.user.bio,
					image: session?.user.avatar_url,
					twitch: session?.user.twitch,
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
