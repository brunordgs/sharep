'use client';
import { cn } from '@/lib/utils';
import { Children } from '@/shared/interfaces/Children';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props extends Children {
	link: string;
	text: string;
}

export function MenuItem({ link, text, children }: Props) {
	const pathname = usePathname();
	const isActive = pathname === link;

	return (
		<li>
			<Link
				href={link}
				className={cn(
					isActive && 'text-black dark:text-white',
					'h-9 px-2 py-2 hover:text-black dark:hover:text-white flex items-center gap-2 rounded-md transition-all ease-out',
				)}
				data-active={isActive}
			>
				{children}
				{text}
			</Link>
		</li>
	);
}