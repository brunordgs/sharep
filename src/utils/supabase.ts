import { supabase } from '@/services/supabaseClient';
import { isProd } from '@/shared/constants';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { toast } from 'react-toastify';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import { v4 as uuidv4 } from 'uuid';

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
	const hashPassword = HmacSHA256(password, String(process.env.SUPABASE_JWT_SECRET)).toString();

	try {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password: hashPassword,
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
	const hashPassword = HmacSHA256(password, String(process.env.SUPABASE_JWT_SECRET)).toString();

	try {
		const { error } = await supabase.auth.signUp({
			email,
			password: hashPassword,
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

		const { error: err } = await supabase.from('users').insert([
			{
				id: uuidv4(),
				name,
				password: hashPassword,
				username,
				avatar_url: 'https://ik.imagekit.io/sharep/icon_3uHBhmu8u.svg', // Default user profile icon
				email,
			},
		]);


		if (err) {
			console.error(err.message);
			return;
		}

		await signIn({ email, password: hashPassword });
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
