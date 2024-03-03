import { Text } from '@ui/Typography/Text';
import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';

interface Props {
	image: string | null;
	name: string;
	description: string;
	url: string;
}

export function ProjectCard({ image, name, description, url }: Props) {
	return (
		<Link
			href={url}
			className="border-t first:border-0 px-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-20 transition-colors ease-out first:rounded-t-md"
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="flex items-center gap-4">
				<Avatar className="w-12 h-12">
					<AvatarImage src={image} alt={name} />
				</Avatar>

				<div>
					<div className="flex items-center gap-1">
						<Text weight="semibold">{name}</Text>
					</div>

					<Text
						size="sm"
						weight="inherit"
						className="dark:font-light text-zinc-500 dark:text-inherit truncate max-w-[192px] sm:max-w-full"
					>
						{description}
					</Text>
				</div>
			</div>
		</Link>
	);
}
