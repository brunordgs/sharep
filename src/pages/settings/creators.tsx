import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { AccountLayout } from '@/layouts/AccountLayout';
import { prisma } from '@/lib/prisma';
import { axios } from '@/services/axios';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
import { Avatar } from '@ui/Avatar';
import { IconButton } from '@ui/Buttons/IconButton';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import Head from 'next/head';
import Link from 'next/link';
// import { CircleWavyCheck, Trash, User } from 'phosphor-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Props {
	users: ShortUser[];
}

export default function SettingsCreators({ users }: Props) {
	const client = useQueryClient();

	const { data: creators } = useQuery<ShortUser[]>('creators', async () => {
		const { data } = await axios.get('/creators');
		return data;
	});

	const removeCreator = useMutation(
		(id: string) =>
			axios.delete('/creators', {
				data: {
					id,
				},
			}),
		{
			onSuccess: () => {
				client.invalidateQueries('creators');
			},
		},
	);

	return (
		<>
			<Head>
				<title>Creators | Sharep</title>
			</Head>

			<AccountLayout>
				<header className="flex items-center justify-between">
					<div>
						<Heading as="h2" transform="italic" size="sm">
							Creators
						</Heading>

						<Text size="sm" className="dark:text-zinc-400">
							Manage new creators.
						</Text>
					</div>

					{/* {users.length > 0 && <NewCreatorDialog users={users} />} */}
				</header>

				<ul className="mt-8">
					{creators && creators.length > 0 ? (
						creators.map(({ id, image, name, username, isVerified }) => (
							<li key={username} className="flex items-center gap-2">
								<div className="flex items-start gap-4 flex-1">
									<Avatar src={image} size="base" alt={name} />

									<div>
										<div className="flex items-center gap-1">
											<Text weight="bold">{name}</Text>
											{/* {isVerified && (
												<CircleWavyCheck
													weight="fill"
													className="text-indigo-500"
													aria-label="Verified account"
												/>
											)} */}
										</div>

										<Text size="sm">@{username}</Text>
									</div>
								</div>

								<div className="flex gap-2">
									<Link href={`/@${username}`} title="Check profile">
										<IconButton variant="tertiary" icon={<User size={18} weight="bold" />} />
									</Link>
									{/* <IconButton
										variant="tertiary"
										icon={<Trash size={18} weight="bold" />}
										onClick={() => removeCreator.mutate(id)}
									/> */}
								</div>
							</li>
						))
					) : (
						<div className="p-4">
							<NoCreatorFound />
						</div>
					)}
				</ul>
			</AccountLayout>
		</>
	);
}

export async function getServerSideProps() {
	const users = await prisma.user.findMany({
		where: {
			isCreator: false,
			NOT: {
				username: 'brunordgs',
			},
		},
		select: {
			id: true,
			name: true,
			username: true,
			image: true,
			isVerified: true,
		},
	});

	return {
		props: {
			users: JSON.parse(JSON.stringify(users)),
		},
	};
}
