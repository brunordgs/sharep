import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/Profile/ProfileNotFound';
import { Loading } from '@ui/Loading';
import { prisma } from '@/lib/prisma';
import { type Creator } from '@/shared/interfaces/Creator';
import { type Project } from '@/shared/interfaces/Project';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { formatDate } from '@/utils/helpers/formats';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
	user: UserProfile;
	creator: Creator;
	projects: Project[];
}

export default function Profile({ user, creator, projects }: Props) {
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
						<ProfileContent creator={creator} projects={projects} {...user} />
					) : (
						<ProfileNotFound username={username} />
					)}
				</Loading>
			</main>
		</>
	);
}

export async function getServerSideProps({ req, params }: GetServerSidePropsContext) {
	const session = await getSession({ req });
	const userId = session?.user.id;

	const fullUsername = params!.profile!.toString();

	// Prevent api request if username doesn't have @ as first character and redirect to 404 page
	if (fullUsername.charAt(0) !== '@') {
		return {
			notFound: true,
		};
	}

	const username = fullUsername.replace('@', '');

	const [user, projects] = await Promise.all([
		prisma.user.findUnique({
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
						twitter: true,
						tiktok: true,
					},
				},
			},
		}),
		prisma.projects.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				image: true,
				url: true,
				name: true,
				description: true,
				sourceName: true,
				sourceUrl: true,
			},
		}),
	]);

	const userFormatted = JSON.parse(
		JSON.stringify({
			...user,
			createdAt: formatDate(String(user?.createdAt)),
			updatedAt: formatDate(String(user?.updatedAt)),
			...(user?.creator && {
				creator: {
					createdAt: formatDate(String(user?.creator?.createdAt)),
				},
			}),
		}),
	);

	return {
		props: {
			user: userFormatted,
			creator: userFormatted?.creator,
			projects,
		},
	};
}
