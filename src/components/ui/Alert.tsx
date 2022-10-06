// import { X } from 'phosphor-react';
import { ReactNode } from 'react';
// import { Button } from './Buttons/Button';
import { Text } from './Typography/Text';

interface Props {
	title: string;
	subtitle?: string;
	actionButton: ReactNode;
	onHandleClose(isOpen: boolean): void;
}

export function Alert({ title, subtitle, actionButton }: Props) {
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

			{actionButton}
		</div>
	);
}
