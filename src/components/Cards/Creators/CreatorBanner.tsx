import { BecomeCreatorDialog } from '@/components/Modals/BecomeCreatorDialog';
import { IconButton } from '@ui/Buttons/IconButton';
import { X } from 'phosphor-react';
import { Text } from '@ui/Typography/Text';

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

				<IconButton
					variant="secondary"
					className="w-6 h-6 p-0"
					icon={<X size={12} weight="bold" aria-label="Close banner" />}
					onClick={() => onHandleClose(false)}
					title="Close banner"
				/>
			</header>

			<Text size="sm" className="mt-2 mb-4 xl:text-base">
				{description}
			</Text>

			<BecomeCreatorDialog />
		</div>
	);
}
