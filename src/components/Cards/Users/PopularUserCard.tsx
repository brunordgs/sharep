import { Avatar } from '@/components/ui/Avatar';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Text } from '@/components/ui/Typography/Text';
import { VERIFIED_ACCOUNTS } from '@/shared/constants';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import { CircleWavyCheck } from 'phosphor-react';

export function PopularUserCard({ name, username }: ShortUser) {
	return (
		<LinkButton
			key={username}
			href={`/@${username}`}
			color="unstyled"
			className="flex items-center w-full hover:bg-zinc-50 dark:hover:bg-zinc-700 py-2 px-6"
		>
			<div className="flex-1 flex items-center gap-2">
				<Avatar src={`https://github.com/${username}.png`} size="xs" alt={name} />

				<div className="leading-3">
					<div className="flex items-center gap-1">
						<Text weight="bold" size="sm" className="truncate max-w-[310px]" title={name}>
							{name}
						</Text>

						{VERIFIED_ACCOUNTS.includes(username) && (
							<CircleWavyCheck
								weight="fill"
								size={16}
								className="text-indigo-500"
								aria-label="Verified account"
							/>
						)}
					</div>

					<Text
						as="span"
						size="sm"
						className="truncate max-w-[350px] inline-block"
						title={`@${username}`}
					>
						@{username}
					</Text>
				</div>
			</div>

			{/* <LinkButton href={`/@${username}`} fontSize="xs" size="custom" className="px-3 py-1">
			Follow
		</LinkButton> */}
		</LinkButton>
	);
}
