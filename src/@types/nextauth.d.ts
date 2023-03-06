import NextAuth from 'next-auth/next';

declare module 'next-auth' {
	interface User {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		username: string;
		isCreator?: boolean
	}

	interface Session {
		user: User;
		supabaseAccessToken: string;
	}
}