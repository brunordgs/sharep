// import { X } from 'phosphor-react';
import { Children } from '@/shared/interfaces/Children';
import { Text } from './Typography/Text';

interface Props extends Children {
	title: string;
	subtitle?: string;
	onHandleClose(isOpen: boolean): void;
}

export function Alert({ title, subtitle, children }: Props) {
	return (
		<div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg p-4 text-zinc-100 dark:text-zinc-200">
			<div className="flex items-center justify-between">
				<Text size="xl" weight="bold" className="text-white">
					{title}
				</Text>

				{/* <Button
					color="unstyled"
					className="bg-zinc-100/40 hover:bg-zinc-100/20 dark:bg-zinc-800/60 dark:hover:bg-zinc-800/40 hover:text-white p-2 rounded-full"
					onClick={() => onHandleClose(false)}
					title="Close alert"
				>
					<X size={16} aria-label="Close alert" />
				</Button> */}
			</div>

			<Text size="sm" className="mt-2 mb-4 xl:text-base">
				{subtitle}
			</Text>

			<button
				className="bg-rose-100 hover:bg-rose-200 dark:bg-rose-200/95 dark:hover:bg-rose-100/90 border-2 border-rose-200 dark:border-rose-300 text-rose-900 hover:text-rose-800 font-medium px-4 py-2 text-sm rounded-md shadow-md transition-colors disabled:bg-rose-600 dark:disabled:bg-rose-400 disabled:border-transparent dark:disabled:border-transparent disabled:text-rose-300"
				disabled
			>
				{children}
			</button>
		</div>
	);
}
