import { VerifiedAccountDialog } from '@/components/Modals/VerifiedAccountDialog';
import { Tooltip } from '@/components/Tooltip';
import { VERIFIED_ACCOUNTS } from '@/shared/constants';
import { GithubUser } from '@/shared/interfaces/GithubUser';
import { CircleWavyCheck, PaintBrush } from 'phosphor-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Avatar } from '../../ui/Avatar';
import { LinkButton } from '../../ui/Buttons/LinkButton';
import { Text } from '../../ui/Typography/Text';

interface Props {
	user: GithubUser;
}

export function Profile({ user }: Props) {
	const isCreator = user.login === 'brunordgs';

	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative">
				{isCreator && (
					<div className="absolute bottom-2 right-4 flex gap-2 z-30">
						<Tooltip data-tip="Creator since Jun 24, 2022">
							<LinkButton href="/creators" color="unstyled" className="bg-gradient-to-r from-pink-700 to-pink-800 shadow-md text-zinc-100 rounded-md py-1 px-2 text-sm italic font-semibold inline-flex items-center gap-2">
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
						{VERIFIED_ACCOUNTS.includes(user.login) && (
							<VerifiedAccountDialog>
								<CircleWavyCheck
									weight="fill"
									size={24}
									className="text-indigo-500"
									aria-label="Verified account"
								/>
							</VerifiedAccountDialog>
						)}
					</div>

					<Text as="span" className="text-[15px]">
						@{user.login}
					</Text>
				</div>
			</div>
		</>
	);
}