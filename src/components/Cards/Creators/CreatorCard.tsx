import { Avatar } from '@/components/ui/Avatar';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Text } from '@/components/ui/Typography/Text';
import { VERIFIED_ACCOUNTS } from '@/shared/constants';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import { CircleWavyCheck } from 'phosphor-react';

export function CreatorCard({ name, username }: ShortUser) {
	return (
		<LinkButton
			key={username}
			href={`/@${username}`}
			color="unstyled"
			className="border-t border-zinc-200 first:border-0 dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-28"
		>
			<div className="flex items-center gap-4">
				<Avatar src={`https://github.com/${username}.png`} alt={name} />

				<div>
					<div className="flex items-center gap-1">
						<Text weight="bold">{name}</Text>
						{VERIFIED_ACCOUNTS.includes(username) && (
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

			{/* <div>additional stuff</div> */}
		</LinkButton>
	);
}
