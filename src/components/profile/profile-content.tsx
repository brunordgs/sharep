'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { LinkButton } from '@/components/ui/link-button';
import { HTTP_PROTOCOL_REGEX } from '@/shared/constants';
import { getFallbackInitials } from '@/utils/helpers/format';
import { Heading } from '@/components/ui/typography/heading';
import { Text } from '@/components/ui/typography/text';
import { CalendarDays } from 'lucide-react';
import { ProjectCard } from '../project-card';
import { VerifiedAccountDialog } from '../verified-account-dialog';

interface BioContentProps {
	bio: string | undefined;
}

function BioContent({ bio }: BioContentProps) {
	const words = bio?.split(' ');
	const matchUrl = /(?:www|https?)[^\s]+/g;

	return (
		<Text>
			{words?.map((word) =>
				word.match(matchUrl) ? (
					<LinkButton
						href={word}
						variant="link"
						className="inline-flex p-0 font-normal text-base"
						target="_blank"
						rel="noreferrer"
					>
						{word.replace(HTTP_PROTOCOL_REGEX, '')}
					</LinkButton>
				) : (
					word + ' '
				),
			)}
		</Text>
	);
}

interface Props {
	name: string;
	username: string;
	bio: string | null;
	image: string;
	isCreator: boolean;
	isVerified: boolean;
	createdAt: Date;
	projects: {
		image: string | null;
		name: string;
		description: string;
		url: string;
	}[];
}

export function ProfileContent({
	name,
	username,
	bio,
	image,
	isCreator,
	isVerified,
	createdAt,
	projects,
}: Props) {
	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative" />

			<div className="-mt-20 mx-4 relative z-10">
				<div className="flex items-end">
					<Avatar className="w-36 h-36 border-4 border-zinc-100 dark:border-zinc-900">
						<AvatarImage src={image} alt={name} />
						<AvatarFallback>{getFallbackInitials(name)}</AvatarFallback>
					</Avatar>

					<div className="flex flex-1 items-center justify-end">
						<LinkButton href="/account/profile" variant="outline">
							Edit profile
						</LinkButton>
					</div>
				</div>

				<div className="mt-4">
					<div className="flex items-center gap-2">
						<Text size="xl" weight="bold" className="md:text-2xl md:leading-none">
							{name}
						</Text>
						{isVerified && <VerifiedAccountDialog />}
					</div>

					<Text as="span" className="text-[15px] text-zinc-400">
						@{username}
					</Text>
				</div>

				<div className="mt-2">
					{bio && <BioContent bio={bio} />}

					<Text size="sm" className="text-muted-foreground flex items-center gap-2 mt-2">
						<CalendarDays className="w-4 h-4" /> Joined{' '}
						{new Intl.DateTimeFormat('en-US', {
							month: 'long',
							year: 'numeric',
						}).format(createdAt)}
					</Text>

					{projects.length > 0 && isCreator && (
						<>
							<Heading as="h2" transform="italic" className="mt-8 mb-2">
								Contributions
							</Heading>

							<Card>
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
