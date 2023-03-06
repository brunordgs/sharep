import NextAuth from 'next-auth';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider<GithubProfile>({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			authorization: {
				url: 'https://github.com/login/oauth/authorize',
				params: {
					scope: 'read:user user:email',
				},
			},
			profile(profile) {
				return {
					id: String(profile.id),
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
					username: profile.login,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/',
	},
	debug: true,
	callbacks: {
		async signIn() {
			return true;
		},
		async session({ session, user }) {
			return {
				...session,
				user,
			};
		},
	},
});
