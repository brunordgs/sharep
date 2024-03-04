import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LinkButton } from '@/components/ui/link-button';
import { Text } from '@/components/ui/typography/text';
import { HTTP_PROTOCOL_REGEX } from '@/shared/constants';
import { getFallbackInitials } from '@/utils/helpers/format';
import { CalendarDays } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { VerifiedAccountDialog } from '../verified-account-dialog';

interface Props {
	name: string;
	username: string;
	bio: string | null;
	image: string;
	isVerified: boolean;
	createdAt: Date;
}

export async function ProfileContent({
	name,
	username,
	bio,
	image,
	isVerified,
	createdAt,
}: Props) {
	const session = await getServerSession(authOptions);

	return (
		<>
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl relative" />

			<div className="-mt-20 mx-4 relative z-10">
				<div className="flex items-end">
					<Avatar className="w-36 h-36 border-4 border-zinc-100 dark:border-zinc-900">
						<AvatarImage src={image} alt={name} />
						<AvatarFallback>{getFallbackInitials(name)}</AvatarFallback>
					</Avatar>

					{session?.user.username === username && (
						<div className="flex flex-1 items-center justify-end">
							<LinkButton href="/account/profile" variant="outline">
								Edit profile
							</LinkButton>
						</div>
					)}
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
					{/* Replace url to a real page link */}
					{bio && (
						<Text>
							{bio.split(' ').map((word) =>
								word.match(/(?:www|https?)[^\s]+/g) ? (
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
					)}

					<Text size="sm" className="text-muted-foreground flex items-center gap-2 mt-2">
						<CalendarDays className="w-4 h-4" /> Joined{' '}
						{new Intl.DateTimeFormat('en-US', {
							month: 'long',
							year: 'numeric',
						}).format(createdAt)}
					</Text>
				</div>
			</div>
		</>
	);
}
