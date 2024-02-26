'use client';
import { IconButton } from '@ui/Buttons/IconButton';
import { X } from '@phosphor-icons/react/dist/ssr';
import { Text } from '@ui/Typography/Text';
import { useState } from 'react';

export function BecomeCreatorBanner() {
	const [open, setOpen] = useState(true);

	return (
		open && (
			<div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg p-4 text-zinc-100 dark:text-zinc-200">
				<header className="flex items-center justify-between">
					<Text size="xl" weight="bold" className="text-white">
						Become a creator
					</Text>

					<IconButton
						variant="secondary"
						className="w-6 h-6 p-0"
						icon={<X className="w-3 h-3" aria-label="Close banner" />}
						onClick={() => setOpen(false)}
						title="Close banner"
					/>
				</header>

				<Text size="sm" className="mt-2 mb-4 max-w-3xl">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo autem itaque provident
					tempore laborum unde libero veniam possimus? Sint culpa, in blanditiis dolorem ex natus
					architecto officiis atque iusto beatae?
				</Text>

				{/* <BecomeCreatorDialog /> */}
			</div>
		)
	);
}
