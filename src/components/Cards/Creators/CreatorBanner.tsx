import { X } from 'phosphor-react';
import { Text } from '../../ui/Typography/Text';
import { Button } from '../../ui/Buttons/Button';
import { BecomeCreatorDialog } from '@/components/Modals/BecomeCreatorDialog';

interface Props {
	title: string;
	description?: string;
	onHandleClose(isOpen: boolean): void;
}

export function CreatorBanner({ title, description, onHandleClose }: Props) {
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

			<BecomeCreatorDialog />
		</div>
	);
}
