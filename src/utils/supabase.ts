import { supabase } from '@/services/supabaseClient';
import { type UserProfile } from '@/shared/interfaces/UserProfile';

export async function signIn() {
	const isProd = process.env.NODE_ENV === 'production';

	supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: !isProd ? 'http://localhost:3000' : 'https://sharep.vercel.app',
		},
	});
}

export async function signOut() {
	return supabase.auth.signOut();
}

export async function getUserInformation(username: string) {
	return supabase.from('users').select().eq('username', username);
}

export async function selectUsers() {
	return supabase.from('users').select();
}

export async function updateUser(data: Partial<UserProfile>) {
	return supabase.from('users').update(data).match({ username: data.username });
}
