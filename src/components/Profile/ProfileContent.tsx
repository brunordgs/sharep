import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { VerifiedAccountDialog } from '@/components/Modals/VerifiedAccountDialog';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Heading } from '@/components/ui/Typography/Heading';
import { HTTP_PROTOCOL_REGEX } from '@/shared/constants';
import { type Creator } from '@/shared/interfaces/Creator';
import { Project } from '@/shared/interfaces/Project';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { Link, PaintBrush, Pencil } from 'phosphor-react';
import { FaGithub, FaTwitch, FaYoutube } from 'react-icons/fa';
import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/Buttons/IconButton';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Text } from '../ui/Typography/Text';

interface BioContentProps {
	bio: string | undefined;
}

function BioContent({ bio }: BioContentProps) {
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
	projects: Project[];
}

export function ProfileContent({
	name,
	username,
	bio,
	image,
	social,
	isCreator,
	isVerified,
	creator,
	projects,
}: Props) {
	const session = useSession();

	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative">
				{isCreator && (
					<div className="absolute bottom-2 right-4 flex gap-2 z-[11]">
						<Tooltip data-tip={`Creator since ${creator.createdAt}`}>
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
					<Avatar src={image} size="lg" hasBorder />

					<div
						className={clsx(
							social ? 'justify-between' : 'justify-end',
							'flex flex-1 items-center my-6',
						)}
					>
						{social && (
							<div className="ml-4 flex items-center gap-6">
								{social.website && (
									<LinkButton
										href={`https://${social.website.replace(HTTP_PROTOCOL_REGEX, '')}`}
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

								{social.github && (
									<LinkButton
										href={`https://github.com/${social.github}`}
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

								{social.twitch && (
									<LinkButton
										href={`https://twitch.tv/${social.twitch}`}
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

								{social.youtube && (
									<LinkButton
										href={`https://www.youtube.com/c/${social.youtube}`}
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
						)}

						{session.data?.user.username === username && (
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

					{projects.length > 0 && isCreator && (
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
