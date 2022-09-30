import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { VerifiedAccountDialog } from '@/components/Modals/VerifiedAccountDialog';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Heading } from '@/components/ui/Typography/Heading';
import projects from '@/data/projects.json';
import { useAuth } from '@/hooks/useAuth';
import { Creator } from '@/shared/interfaces/Creator';
import { UserProfile } from '@/shared/interfaces/UserProfile';
import { formatDate } from '@/utils/formats';
import { PaintBrush, Pencil } from 'phosphor-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { Avatar } from '../ui/Avatar';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Text } from '../ui/Typography/Text';

interface Props extends UserProfile {
	creator: Creator;
}

export function ProfileContent({
	name,
	username,
	bio,
	avatar_url: avatarUrl,
	twitter,
	is_creator: isCreator,
	is_verified: isVerified,
	creator,
}: Props) {
	const auth = useAuth();

	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative">
				{isCreator && (
					<div className="absolute bottom-2 right-4 flex gap-2 z-20">
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
							{twitter && (
								<LinkButton
									href={`https://twitter.com/${twitter}`}
									isExternal
									color="unstyled"
									fontSize="sm"
									className="flex items-center gap-2 hover:text-black dark:hover:text-white"
								>
									<FaTwitter className="text-base" />
									<Text as="span" className="hidden sm:block">
										Twitter
									</Text>
								</LinkButton>
							)}

							<LinkButton
								href={`https://github.com/${username}`}
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
						</div>

						{auth?.user?.username === username && (
							<LinkButton
								href="/settings/account"
								color="unstyled"
								className="bg-zinc-200/60 hover:bg-zinc-200 hover:text-black hover:dark:text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2 rounded-full"
								aria-label="Edit profile"
								title="Edit profile"
							>
								<Pencil size={16} />
							</LinkButton>
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
					{bio && <Text className="text-zinc-600 dark:text-zinc-300">{bio}</Text>}

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
