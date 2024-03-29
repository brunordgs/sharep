import { Avatar } from '@/components/ui/Avatar';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Text } from '@/components/ui/Typography/Text';
import { CircleWavyCheck } from 'phosphor-react';

interface Props {
	name: string;
	image: string;
	username: string;
	isVerified: boolean;
}

export function FeaturedUserItem({ name, username, isVerified, image }: Props) {
	return (
		<LinkButton
			key={username}
			href={`/@${username}`}
			color="unstyled"
			className="flex items-center w-full hover:bg-zinc-50 dark:hover:bg-zinc-700 py-2 px-6"
		>
			<div className="flex-1 flex items-center gap-2">
				<Avatar src={image} size="xs" alt={name} />

				<div className="leading-3">
					<div className="flex items-center gap-1 hover:underline">
						<Text
							weight="bold"
							size="sm"
							className="truncate md:max-w-[10rem] xl:max-w-[12rem] 2xl:max-w-[16rem]"
							title={name}
						>
							{name}
						</Text>

						{isVerified && (
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
