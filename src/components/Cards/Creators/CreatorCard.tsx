import { Avatar } from '@/components/ui/avatar';
import { Text } from '@ui/Typography/Text';
import { CircleWavyCheck } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

interface Props {
	name: string;
	username: string;
	isVerified: boolean;
	avatar: string;
}

export function CreatorCard({ name, username, isVerified, avatar }: Props) {
	return (
		<Link
			key={username}
			href={`/@${username}`}
			className="border-t border-zinc-200 first:border-0 dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-28 transition-colors ease-out"
		>
			<div className="flex items-center gap-4">
				<Avatar src={avatar} alt={name} />

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
