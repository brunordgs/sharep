'use client';
import { cn } from '@/lib/utils';
import { Children } from '@/shared/interfaces/Children';
import { usePathname } from 'next/navigation';

export function BackgroundGradient({ children }: Children) {
	const pathname = usePathname();

	return (
		<div
			className={cn(
				pathname.startsWith('/products') ? 'bloom min-h-screen' : '[&>header]:border-b',
			)}
		>
			{children}
		</div>
	);
}
