import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFallbackInitials } from '@/utils/helpers/format';
import { CircleWavyCheck } from '@phosphor-icons/react/dist/ssr';
import { Text } from '@/components/ui/typography/text';
import Link from 'next/link';

interface Props {
	name: string;
	username: string;
	isVerified: boolean;
	image: string;
}

export function CreatorCard({ name, username, isVerified, image }: Props) {
	return (
		<Link
			key={username}
			href={`/@${username}`}
			className="border-t border-zinc-200 first:border-0 dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-28 transition-colors ease-out"
		>
			<div className="flex items-center gap-4">
				<Avatar className="w-16 h-16">
					<AvatarImage src={image} alt={name} />
					<AvatarFallback>{getFallbackInitials(name)}</AvatarFallback>
				</Avatar>

				<div>
					<div className="flex items-center gap-1">
						<Text weight="bold">{name}</Text>
						{isVerified && (
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
		</Link>
	);
}
