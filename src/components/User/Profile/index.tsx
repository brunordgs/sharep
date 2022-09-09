import { VerifiedAccountDialog } from '@/components/Modals/VerifiedAccountDialog';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Heading } from '@/components/ui/Typography/Heading';
import projects from '@/data/projects.json';
import { CREATORS, VERIFIED_ACCOUNTS } from '@/shared/constants';
import { GithubUser } from '@/shared/interfaces/GithubUser';
import { FileSearch, PaintBrush } from 'phosphor-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Avatar } from '../../ui/Avatar';
import { LinkButton } from '../../ui/Buttons/LinkButton';
import { Text } from '../../ui/Typography/Text';

interface Props {
	user: GithubUser;
}

export function Profile({ user }: Props) {
	const isCreator = CREATORS.includes(user.login);

	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative">
				{isCreator && (
					<div className="absolute bottom-2 right-4 flex gap-2 z-30">
						<Tooltip data-tip="Creator since Sep 08, 2022">
							<LinkButton
								href="/creators"
								color="unstyled"
								className="bg-gradient-to-r from-pink-700 to-pink-800 shadow-md text-zinc-100 rounded-md py-1 px-2 text-sm italic font-semibold inline-flex items-center gap-2"
							>
								Creator
								<PaintBrush size={16} />
							</LinkButton>
						</Tooltip>
					</div>
				)}
			</div>

			<div className="-mt-20 mx-4 relative z-10">
				<div className="flex items-end">
					<Avatar src={user.avatar_url} size="md" hasBorder />

					<div className="m-6 flex items-center gap-6">
						{user.twitter_username && (
							<LinkButton
								href={`https://twitter.com/${user.twitter_username}`}
								isExternal
								color="unstyled"
								fontSize="base"
								className="flex items-center gap-2 hover:text-black dark:hover:text-white"
							>
								<FaTwitter />
								Twitter
							</LinkButton>
						)}

						<LinkButton
							href={`https://github.com/${user.login}`}
							isExternal
							color="unstyled"
							fontSize="sm"
							className="hover:text-black dark:hover:text-white"
						>
							<FaGithub className="text-base" />
							Github
						</LinkButton>
					</div>
				</div>

				<div>
					<div className="flex items-center gap-2">
						<Text size="xl" weight="bold" className="md:text-3xl">
							{user.name}
						</Text>
						{VERIFIED_ACCOUNTS.includes(user.login) && <VerifiedAccountDialog size={24} />}
					</div>

					<Text as="span" className="text-[15px]">
						@{user.login}
					</Text>
				</div>

				<div className="mt-8">
					{projects.length && CREATORS.includes(user.login) && (
						<>
							<Heading transform="italic" className="mb-4">
								Contributions
							</Heading>

							<Card noPadding>
								{projects.map(({ url, title, name, description }) => (
									<div
										key={url}
										onClick={() => window.open(url, '_blank')}
										className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full hover:rounded-t-md cursor-pointer relative"
									>
										<div className="flex items-center gap-4">
											{/* <img
									src={`https://github.com/${username}.png`}
									className="w-16 h-16 rounded-full"
								/> */}

											<div className="bg-rose-500 h-16 w-16 rounded-md flex items-center justify-center font-bold text-zinc-100 text-2xl">
												{title.charAt(0) + title.charAt(1)}
											</div>

											<div>
												<div className="flex items-center gap-1">
													<Text weight="semibold">{title}</Text>
												</div>

												<Text
													size="sm"
													weight="inherit"
													className="dark:font-light text-zinc-500 dark:text-inherit"
												>
													{description}
												</Text>

												{/* hover:text-zinc-600 dark:hover:text-zinc-300 */}
												<div className="flex items-start gap-1 mt-2 font-medium text-zinc-500 dark:text-zinc-400 transition-colors duration-300 text-xs">
													<FaGithub className="text-sm" />
													{/* <Link href={source}>
													<a target="_blank" rel="noopener noreferrer">
														{name}
													</a>
												</Link> */}
													{name}
												</div>
											</div>
										</div>

										{/* <div></div> */}
									</div>
								))}
							</Card>
						</>
					)}
				</div>
			</div>
		</>
	);
}
