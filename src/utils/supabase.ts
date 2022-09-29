import { supabase } from '@/services/supabaseClient';

export async function signIn() {
	const isProd = process.env.NODE_ENV === 'production';

	await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: !isProd ? 'http://localhost:3000' : 'https://sharep.vercel.app',
		},
	});
}

export async function signOut() {
	return supabase.auth.signOut();
}
