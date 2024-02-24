import { ProfileContent } from '@/components/Profile/ProfileContent';
import { ProfileNotFound } from '@/components/Profile/ProfileNotFound';
import { prisma } from '@/lib/prisma';

interface Props {
	params: {
		profile: string;
	};
}

export default async function Profile({ params }: Props) {
	const username = decodeURIComponent(params.profile).replace('@', '') as string;

	const currentUser = await prisma.user.findFirst({
		where: {
			username,
		},
	});

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
		prisma.project.findMany({
			where: {
				userId: currentUser?.id,
			},
			select: {
				id: true,
				image: true,
				url: true,
				name: true,
				description: true,
				repo: true,
				repoUrl: true,
			},
		}),
	]);

	const userNotFound = !user;

	return (
		<main className="max-w-5xl w-full mx-auto mb-10">
			{!userNotFound ? (
				<ProfileContent projects={projects} {...user} />
			) : (
				<ProfileNotFound username={username} />
			)}
		</main>
	);
}

// export async function getServerSideProps({ req, params }: GetServerSidePropsContext) {
// 	const session = await getSession({ req });
// 	const userId = session?.user.id;

// 	const fullUsername = params!.profile!.toString();

// 	// Prevent api request if username doesn't have @ as first character and redirect to 404 page
// 	if (fullUsername.charAt(0) !== '@') {
// 		return {
// 			notFound: true,
// 		};
// 	}

// 	const username = fullUsername.replace('@', '');

// 	const userFormatted = JSON.parse(
// 		JSON.stringify({
// 			...user,
// 			createdAt: formatDate(String(user?.createdAt)),
// 			updatedAt: formatDate(String(user?.updatedAt)),
// 			...(user?.creator && {
// 				creator: {
// 					createdAt: formatDate(String(user?.creator?.createdAt)),
// 				},
// 			}),
// 		}),
// 	);

// 	return {
// 		props: {
// 			user: userFormatted,
// 			creator: userFormatted?.creator,
// 			projects,
// 		},
// 	};
// }
