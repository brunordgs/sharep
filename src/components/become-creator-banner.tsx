'use client';
import { Text } from '@/components/ui/typography/text';
import { X } from 'lucide-react';
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

					<button
						type="button"
						onClick={() => setOpen(false)}
						className="bg-zinc-100/40 hover:bg-zinc-100/20 dark:bg-zinc-800/20 dark:hover:bg-zinc-800/40 hover:text-white w-6 h-6 rounded-full flex items-center justify-center transition-colors"
					>
						<X className="w-3 h-3" aria-label="Close banner" />
					</button>
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
