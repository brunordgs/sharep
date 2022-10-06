import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { LinkButton } from '../../ui/Buttons/LinkButton';
import { Text } from '../../ui/Typography/Text';

interface Props {
	url: string;
	title: string;
	description: string;
	name: string;
	source: string;
}

export function ProjectCard({ url, title, description, name, source }: Props) {
	return (
		<LinkButton
			href={url}
			isExternal
			color="unstyled"
			className="border-t border-zinc-200 first:border-0 dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-28"
		>
			<div className="flex items-center gap-4">
				<div className="bg-rose-500 h-16 w-16 rounded-md flex items-center justify-center font-bold text-zinc-100 text-2xl italic">
					<Image src="/sharep-logo-icon.svg" width={150} height={150} alt="Sharep logo" />
				</div>

				<div>
					<div className="flex items-center gap-1">
						<Text weight="semibold">{title}</Text>
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
							onClick={() => window.open(source, '_blank')}
						>
							{name}
						</button>
					</div>
				</div>
			</div>

			{/* <div></div> */}
		</LinkButton>
	);
}
