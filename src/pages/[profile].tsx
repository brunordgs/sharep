import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/Profile/ProfileNotFound';
import { Loading } from '@/components/ui/Loading';
import { prisma } from '@/lib/prisma';
import { POPULAR_USERS } from '@/shared/constants';
import { type Creator } from '@/shared/interfaces/Creator';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { formatDate } from '@/utils/helpers/formats';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
	user: UserProfile;
	creator: Creator;
}

export default function Profile({ user, creator }: Props) {
	const router = useRouter();

	const username = router.query.profile as string;
	const userNotFound = !user;

	return (
		<>
			<Head>
				<title>
					{!userNotFound ? `${user.name ?? ''} (@${user.username}) | Sharep` : 'Profile | Sharep'}
				</title>
			</Head>

			<main className="max-w-5xl w-full mx-auto mb-10">
				<Loading loading={router.isFallback} className="my-32">
					{!userNotFound ? (
						<ProfileContent creator={creator} {...user} />
					) : (
						<ProfileNotFound username={username} />
					)}
				</Loading>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	const paths = POPULAR_USERS.map((user) => ({
		params: {
			profile: '@' + user,
		},
	}));

	return {
		paths: paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	try {
		const fullUsername = params!.profile!.toString();

		// Prevent api request if username doesn't have @ as first character and redirect to 404 page
		if (fullUsername.charAt(0) !== '@') {
			return {
				notFound: true,
			};
		}

		const username = fullUsername.replace('@', '');

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			include: {
				creator: {
					select: {
						createdAt: true,
					},
				},
				social: {
					select: {
						website: true,
						github: true,
						twitch: true,
						youtube: true,
					},
				},
			},
		});

		const userFormatted = {
			...user,
			createdAt: formatDate(String(user?.createdAt)),
			updatedAt: formatDate(String(user?.updatedAt)),
			creator: {
				createdAt: formatDate(String(user?.creator?.createdAt)),
			},
		};

		return {
			props: {
				user: userFormatted,
				creator: userFormatted.creator,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
}
