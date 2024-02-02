import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider, { GithubProfile } from 'next-auth/providers/github';

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Email and Password',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Please enter an email and password');
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user?.password) {
					throw new Error('No user found');
				}

				const passwordMatch = await bcrypt.compare(credentials.password, user.password);

				if (!passwordMatch) {
					throw new Error('Invalid password');
				}

				return user;
			},
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
	pages: {
		signIn: '/auth/signin',
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
} satisfies NextAuthOptions;
