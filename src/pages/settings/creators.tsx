import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { NewCreatorDialog } from '@/components/Modals/NewCreatorDialog';
import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/Buttons/IconButton';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { AccountLayout } from '@/layouts/AccountLayout';
import { prisma } from '@/lib/prisma';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import Head from 'next/head';
import Link from 'next/link';
import { CircleWavyCheck, Trash, User } from 'phosphor-react';

interface Props {
	users: ShortUser[];
	creators: ShortUser[];
}

export default function SettingsCreators({ users, creators }: Props) {
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
							Change identifying details for you account
						</Text>
					</div>

					{creators.length > 0 && <NewCreatorDialog users={users} />}
				</header>

				<ul className="mt-8">
					{creators ? (
						creators.map(({ image, name, username, isVerified }) => (
							<li key={username} className="flex items-center gap-2">
								<div className="flex items-start gap-4 flex-1">
									<Avatar src={image} size="base" alt={name} />

									<div>
										<div className="flex items-center gap-1">
											<Text weight="bold">{name}</Text>
											{isVerified && (
												<CircleWavyCheck
													weight="fill"
													className="text-indigo-500"
													aria-label="Verified account"
												/>
											)}
										</div>

										<Text size="sm">@{username}</Text>
									</div>
								</div>

								<div className="flex gap-2">
									<Link href={`/@${username}`} title="Check profile">
										<IconButton variant="tertiary" icon={<User size={18} weight="bold" />} />
									</Link>
									<IconButton variant="tertiary" icon={<Trash size={18} weight="bold" />} />
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
	const [users, creators] = await Promise.all([
		await prisma.user.findMany({
			where: {
				isCreator: false
			},
			select: {
				name: true,
				username: true,
				image: true,
				isVerified: true,
			},
		}),
		await prisma.user.findMany({
			where: {
				isCreator: true,
			},
			select: {
				name: true,
				username: true,
				image: true,
				isVerified: true,
			},
		}),
	]);

	return {
		props: {
			users: JSON.parse(JSON.stringify(users)),
			creators: JSON.parse(JSON.stringify(creators)),
		},
	};
}
