import { supabase } from '@/services/supabaseClient';
import { isProd } from '@/shared/constants';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { toast } from 'react-toastify';

export async function signInWithGithub() {
	supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: !isProd ? 'http://localhost:3000' : 'https://sharep.vercel.app',
		},
	});
}

interface SignInProps {
	email: string;
	password: string;
}

export async function signIn({ email, password }: SignInProps) {
	try {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw new Error('Email or password is invalid');
		}
	} catch (e) {
		if (e instanceof Error) {
			toast.error(e.message);
		}
	}
}

interface SignUpProps extends SignInProps {
	name: string;
	username: string;
}

export async function signUp({ email, password, name, username }: SignUpProps) {
	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name,
					username,
				},
			},
		});

		if (error) {
			throw error;
		}

		await supabase.from('users').insert([
			{
				name: data.user?.user_metadata.name,
				username: data.user?.user_metadata.username,
				avatar_url: 'https://ik.imagekit.io/sharep/icon_3uHBhmu8u.svg', // Default user profile icon
				email: data.user?.email,
			},
		]);
	} catch (e) {
		if (e instanceof Error) {
			toast.error(e.message);
		}
	}
}

export async function signOut() {
	return supabase.auth.signOut();
}

export async function getUserInformation(username: string) {
	return supabase
		.from('users')
		.select(
			'name, username, avatar_url, bio, is_creator, is_verified, github, twitch, youtube, website',
		)
		.eq('username', username);
}

export async function getCreatorInformation(username: string) {
	return supabase.from('creators').select('created_at').eq('username', username);
}

export async function selectUsers() {
	return supabase.from('users').select('name, avatar_url, username, is_verified');
}

export async function updateUser(data: Partial<UserProfile>) {
	return supabase.from('users').update(data).match({ username: data.username });
}

export async function getSession() {
	return supabase.auth.getSession();
}
