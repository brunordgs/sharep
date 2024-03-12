import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials): Promise<any> {},
		}),
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
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/signin',
	},
	debug: true,
	callbacks: {
		async signIn() {
			return true;
		},
		async session({ session, token }): Promise<any> {
			const finalSession = {
				expires: session.expires,
				user: {
					id: token.id,
					name: token.name,
					username: token.username,
					image: token.image,
					email: token.email,
					bio: token.bio,
					isAdmin: token.isAdmin,
					isCreator: token.isCreator,
					isVerified: token.isVerified,
					emailVerified: token.emailVerified,
				},
			};

			return finalSession;
		},
		async jwt({ session, token, user, trigger }) {
			if (trigger === 'update') {
				return { ...token, ...session.user };
			}

			return { ...token, ...user };
		},
	},
} satisfies NextAuthOptions;
