import { X } from 'phosphor-react';
import { type Children } from '@/shared/interfaces/Children';
import { Text } from './Typography/Text';
import { Button } from './Buttons/Button';

interface Props extends Children {
	title: string;
	description?: string;
	onHandleClose(isOpen: boolean): void;
}

export function Banner({ title, description, onHandleClose, children }: Props) {
	return (
		<div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg p-4 text-zinc-100 dark:text-zinc-200">
			<header className="flex items-center justify-between">
				<Text size="xl" weight="bold" className="text-white">
					{title}
				</Text>

				<Button
					color="unstyled"
					className="bg-zinc-100/40 hover:bg-zinc-100/20 dark:bg-zinc-800/60 dark:hover:bg-zinc-800/40 hover:text-white p-2 rounded-full"
					onClick={() => onHandleClose(false)}
					title="Close banner"
				>
					<X size={16} aria-label="Close banner" />
				</Button>
			</header>

			<Text size="sm" className="mt-2 mb-4 xl:text-base">
				{description}
			</Text>

			<button
				className="bg-rose-400 border border-rose-400 text-rose-100 hover:text-white font-medium px-4 py-2 text-sm rounded-md shadow-md transition-colors disabled:bg-rose-400 disabled:border-transparent disabled:text-rose-300 disabled:cursor-not-allowed"
				disabled
			>
				{children}
			</button>
		</div>
	);
}
