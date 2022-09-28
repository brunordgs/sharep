import { supabase } from '@/services/supabaseClient';

export async function signIn() {
	await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: '/',
		},
	});
}

export async function signOut() {
	return supabase.auth.signOut();
}
