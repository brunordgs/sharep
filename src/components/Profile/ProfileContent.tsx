'use client';
import { ProjectCard } from '@/components/cards/Projects/ProjectCard';
// import { VerifiedAccountDialog } from '@/components/Modals/VerifiedAccountDialog';
import { Card } from '@ui/Card';
import { Tooltip } from '@ui/Tooltip';
import { Heading } from '@ui/Typography/Heading';
import { HTTP_PROTOCOL_REGEX } from '@/shared/constants';
import { type Creator } from '@/shared/interfaces/Creator';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { type Platform } from '@/shared/types/Platform';
import Link from 'next/link';
import { Link as LinkIcon, PaintBrush, Pencil } from '@phosphor-icons/react/dist/ssr';
import { FaGithub, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Text } from '@ui/Typography/Text';
import { cn } from '@/lib/utils';
import { getFallbackInitials } from '@/utils/helpers/format';
import { Project } from '@prisma/client';

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
					<LinkButton href={word} intent="link" className="inline-flex" isExternal>
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
	projects: Omit<Project, 'userId'>[];
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
	function generateLinkForPlatform(platform: Platform, userOrLink: string) {
		switch (platform) {
			case 'website':
				return `https://${userOrLink.replace(HTTP_PROTOCOL_REGEX, '')}`;
			case 'github':
				return `https:/github.com/${userOrLink}`;
			case 'twitter':
				return `https:/twitter.com/${userOrLink}`;
			case 'twitch':
				return `https:/twitch.tv/${userOrLink}`;
			case 'youtube':
				return `https:/youtube.com/c/${userOrLink}`;
			case 'tiktok':
				return `https:/tiktok.com/@${userOrLink}`;
			default:
				return `https://${userOrLink.replace(HTTP_PROTOCOL_REGEX, '')}`;
		}
	}

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
					<Avatar className="w-36 h-36 border-4 border-zinc-100 dark:border-zinc-900">
						<AvatarImage src={image} alt={name} />
						<AvatarFallback>{getFallbackInitials(name)}</AvatarFallback>
					</Avatar>

					<div
						className={cn(
							social ? 'justify-between' : 'justify-end',
							'flex flex-1 items-center my-6',
						)}
					>
						{social && (
							<div className="ml-4 flex items-center gap-x-3 sm:gap-x-4 md:gap-x-6">
								{Object.entries(social).map(
									([platform, link]) =>
										link && (
											<Link
												key={platform}
												href={generateLinkForPlatform(platform as Platform, link)}
												className="hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors ease-out"
												target="_blank"
												rel="noopener noreferrer"
											>
												<IconForPlatform platform={platform as Platform} />
												<Text as="span" transform="capitalize" className="hidden sm:block">
													{platform}
												</Text>
											</Link>
										),
								)}
							</div>
						)}

						{/* {session.data?.user.username === username && (
							<IconButton
								href="/settings/account"
								isAnchor
								// icon={<Pencil size={16} weight="duotone" aria-label="Edit profile" />}
								title="Edit profile"
							/>
						)} */}
					</div>
				</div>

				<div className="mt-4">
					<div className="flex items-center gap-2">
						<Text size="xl" weight="bold" className="md:text-3xl md:leading-none">
							{name}
						</Text>
						{/* {isVerified && <VerifiedAccountDialog size={24} />} */}
					</div>

					<Text as="span" className="text-[15px] text-zinc-400">
						@{username}
					</Text>
				</div>

				<div className="mt-4">
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

interface IconForPlatformProps {
	platform: Platform;
}

function IconForPlatform({ platform }: IconForPlatformProps) {
	switch (platform) {
		case 'website':
			return <LinkIcon />;
		case 'github':
			return <FaGithub className="text-base" />;
		case 'twitter':
			return <FaTwitter className="text-base" />;
		case 'twitch':
			return <FaTwitch className="text-base" />;
		case 'youtube':
			return <FaYoutube className="text-base" />;
		case 'tiktok':
			return <FaTiktok className="text-base" />;
		default:
			return null;
	}
}
