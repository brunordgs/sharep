import { Image } from '@/components/ui/Image';
import { Project } from '@/shared/interfaces/Project';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Text } from '../../ui/Typography/Text';
import { cx } from 'class-variance-authority';

export function ProjectCard({ image, name, description, url, sourceName, sourceUrl }: Project) {
	return (
		<Link
			href={url}
			className="border-t border-zinc-200 first:border-0 dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-28"
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className="flex items-center gap-4">
				<div
					className={cx(
						'h-16 w-16 rounded-md flex items-center justify-center font-bold text-zinc-100 text-2xl italic overflow-hidden',
						{ 'bg-rose-500': !image },
					)}
				>
					<Image
						src={image ?? '/sharep-logo-icon.svg'}
						className="w-[150px] h-[150px]"
						alt={image ? name : 'Sharep'}
					/>
				</div>

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

					<div
						className="flex items-start gap-1 mt-2 font-medium text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors ease-out text-xs"
						title="Check more on Github"
					>
						<FaGithub className="text-sm" />
						<button
							type="button"
							className="truncate max-w-[192px] sm:max-w-full"
							onClick={() => window.open(sourceUrl, '_blank')}
						>
							{sourceName}
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
}
