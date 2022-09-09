import { Avatar } from '@/components/ui/Avatar';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { PopularUsersCard } from '@/components/User/PopularUsersCard';
import { VERIFIED_ACCOUNTS } from '@/shared/constants';
import Head from 'next/head';
import { CircleWavyCheck } from 'phosphor-react';

export default function Creators() {
	const creators = [
		{
			name: 'Leonardo Vargas',
			username: 'leovargasdev',
		},
	];

	return (
		<>
			<Head>
				<title>Creators | sharep</title>
			</Head>

			<Container className="my-6">
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					Awesome creators
				</Heading>

				<div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 mt-6">
					<Card className="lg:col-span-4 row-span-2" noPadding>
						{creators.map(({ name, username }) => (
							<LinkButton
								key={username}
								href={`/@${username}`}
								color="unstyled"
								className="border-b border-zinc-200 last:border-b-0 lg:last:border-b dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full"
							>
								<div className="flex items-center gap-4">
									<Avatar src={`https://github.com/${username}.png`} alt={name} />

									<div>
										<div className="flex items-center gap-1">
											<Text weight="bold">{name}</Text>
											{VERIFIED_ACCOUNTS.includes(username) && (
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

								{/* <div>additional stuff</div> */}
							</LinkButton>
						))}
					</Card>

					<PopularUsersCard />
				</div>
			</Container>
		</>
	);
}
