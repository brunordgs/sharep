import { VERIFIED_ACCOUNTS } from '@/shared/constants';
import { CircleWavyCheck } from 'phosphor-react';
import { Footer } from '../Footer';
import { Avatar } from '../ui/Avatar';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Card } from '../ui/Card';
import { Heading } from '../ui/Typography/Heading';
import { Text } from '../ui/Typography/Text';

export function PopularUsersCard() {
	const popularUsers = [
		{
			name: 'Bruno Rodrigues',
			username: 'brunordgs',
		},
		{
			name: 'Leonardo Vargas',
			username: 'leovargasdev',
		},
	];

	return (
		<div className="hidden lg:block col-span-2">
			<Card className="mb-2 py-6" noPadding>
				<aside>
					<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
						Popular users
					</Heading>

					{popularUsers.map(({ name, username }) => (
						<LinkButton
							key={username}
							href={`/@${username}`}
							color="unstyled"
							className="flex items-center w-full hover:bg-zinc-50 dark:hover:bg-zinc-700 py-2 px-6"
						>
							<div className="flex-1 flex items-center gap-2">
								<Avatar src={`https://github.com/${username}.png`} size="xs" alt={name} />

								<div className="leading-3">
									<div className="flex items-center gap-1">
										<Text weight="bold" size="sm" className="truncate w-28 xl:w-full" title={name}>
											{name}
										</Text>

										{VERIFIED_ACCOUNTS.includes(username) && (
											<CircleWavyCheck
												weight="fill"
												size={16}
												className="text-indigo-500"
												aria-label="Verified account"
											/>
										)}
									</div>

									<Text
										as="span"
										size="sm"
										className="truncate w-28 xl:w-full inline-block"
										title={`@${username}`}
									>
										@{username}
									</Text>
								</div>
							</div>

							{/* <LinkButton href={`/@${username}`} fontSize="xs" size="custom" className="px-3 py-1">
								Follow
							</LinkButton> */}
						</LinkButton>
					))}
				</aside>
			</Card>

			<Footer />
		</div>
	);
}
