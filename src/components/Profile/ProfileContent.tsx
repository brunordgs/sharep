import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { VerifiedAccountDialog } from '@/components/Modals/VerifiedAccountDialog';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Heading } from '@/components/ui/Typography/Heading';
import projects from '@/data/projects.json';
import { useAuth } from '@/hooks/useAuth';
import { HTTP_PROTOCOL_REGEX } from '@/shared/constants';
import { type Creator } from '@/shared/interfaces/Creator';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { formatDate } from '@/utils/helpers/formats';
import { Link, PaintBrush, Pencil } from 'phosphor-react';
import { FaGithub, FaTwitch, FaYoutube } from 'react-icons/fa';
import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/Buttons/IconButton';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Text } from '../ui/Typography/Text';

function BioContent({ bio }: { bio: string | undefined }) {
	const words = bio?.split(' ');
	const matchUrl = /(?:www|https?)[^\s]+/g;

	return (
		<Text className="text-zinc-600 dark:text-zinc-300">
			{words?.map((word) =>
				word.match(matchUrl) ? (
					<LinkButton href={word} color="link" className="inline-flex" isExternal>
						{word.replace(HTTP_PROTOCOL_REGEX, '')}
					</LinkButton>
				) : (
					word + ' '
				),
			)}
		</Text>
	);
}

interface Props extends UserProfile {
	creator: Creator;
}

export function ProfileContent({
	name,
	username,
	bio,
	avatar_url: avatarUrl,
	website,
	youtube,
	twitch,
	github,
	is_creator: isCreator,
	is_verified: isVerified,
	creator,
}: Props) {
	const auth = useAuth();

	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative">
				{isCreator && (
					<div className="absolute bottom-2 right-4 flex gap-2 z-[11]">
						<Tooltip data-tip={`Creator since ${formatDate(creator.created_at)}`}>
							<div className="bg-gradient-to-r from-pink-700 to-pink-800 shadow-md text-zinc-100 rounded-md py-1 px-2 text-sm italic font-semibold inline-flex items-center gap-2 select-none">
								Creator
								<PaintBrush size={16} />
							</div>
						</Tooltip>
					</div>
				)}
			</div>

			<div className="-mt-20 mx-4 relative z-10">
				<div className="flex items-end">
					<Avatar src={avatarUrl} size="lg" hasBorder />

					<div className="flex flex-1 items-center justify-between">
						<div className="m-6 flex items-center gap-6">
							{website && (
								<LinkButton
									href={`https://${website.replace(HTTP_PROTOCOL_REGEX, '')}`}
									isExternal
									color="unstyled"
									fontSize="sm"
									className="hover:text-black dark:hover:text-white"
								>
									<Link />
									<Text as="span" className="hidden sm:block">
										Website
									</Text>
								</LinkButton>
							)}

							{github && (
								<LinkButton
									href={`https://github.com/${github}`}
									isExternal
									color="unstyled"
									fontSize="sm"
									className="hover:text-black dark:hover:text-white"
								>
									<FaGithub className="text-base" />
									<Text as="span" className="hidden sm:block">
										Github
									</Text>
								</LinkButton>
							)}

							{twitch && (
								<LinkButton
									href={`https://twitch.tv/${twitch}`}
									isExternal
									color="unstyled"
									fontSize="sm"
									className="flex items-center gap-2 hover:text-black dark:hover:text-white"
								>
									<FaTwitch className="text-base" />
									<Text as="span" className="hidden sm:block">
										Twitch
									</Text>
								</LinkButton>
							)}

							{youtube && (
								<LinkButton
									href={`https://www.youtube.com/c/${youtube}`}
									isExternal
									color="unstyled"
									fontSize="sm"
									className="flex items-center gap-2 hover:text-black dark:hover:text-white"
								>
									<FaYoutube className="text-base" />
									<Text as="span" className="hidden sm:block">
										Youtube
									</Text>
								</LinkButton>
							)}
						</div>

						{auth?.user.username === username && (
							<IconButton
								href="/settings/account"
								isAnchor
								icon={<Pencil size={16} weight="duotone" aria-label="Edit profile" />}
								title="Edit profile"
							/>
						)}
					</div>
				</div>

				<div>
					<div className="flex items-center gap-2">
						<Text size="xl" weight="bold" className="md:text-3xl">
							{name}
						</Text>
						{isVerified && <VerifiedAccountDialog size={24} />}
					</div>

					<Text as="span" className="text-[15px]">
						@{username}
					</Text>
				</div>

				<div className="mt-2">
					{bio && <BioContent bio={bio} />}

					{projects.length && isCreator && (
						<>
							<Heading as="h2" transform="italic" className="mt-8 mb-2">
								Contributions
							</Heading>

							<Card noPadding>
								{projects.map(({ url, ...rest }) => (
									<ProjectCard key={url} url={url} {...rest} />
								))}
							</Card>
						</>
					)}
				</div>
			</div>
		</>
	);
}
