import { supabase } from '@/services/supabaseClient';
import { type Children } from '@/shared/interfaces/Children';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { getSession, getUserInformation, selectUsers } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
	session?: Session | null;
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
	const [session, setSession] = useState<{ session: Session | null; user: UserProfile } | null>(
		null,
	);

	useEffect(() => {
		async function initializeAsync() {
			const {
				data: { session },
			} = await getSession();

			if (!session) return;

			const username =
				session?.user?.user_metadata?.user_name ?? session?.user?.user_metadata?.username;

			const [users, user] = await Promise.all([selectUsers(), getUserInformation(username)]);

			const usernames = users.data?.map(({ username }) => username);

			if (!usernames?.includes(username)) {
				await supabase.from('users').insert([
					{
						name: session?.user?.user_metadata?.full_name,
						username,
						avatar_url: session?.user?.user_metadata?.avatar_url,
						email: session?.user?.user_metadata?.email,
					},
				]);
			}

			setSession({ session, user: user.data![0] });
		}

		initializeAsync();
	}, []);

	supabase.auth.onAuthStateChange(async (_, currentSession) => {
		const username = currentSession?.user?.user_metadata?.username;
		const user = await getUserInformation(username);

		setSession({ session: currentSession, user: user.data![0] });
	});

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
