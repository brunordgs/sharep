'use client';
import { Children } from '@/shared/interfaces/Children';
import { usePathname } from 'next/navigation';

export function BackgroundGradient({ children }: Children) {
	const pathname = usePathname();

	return pathname.startsWith('/products') ? (
		<div className="bloom min-h-screen">{children}</div>
	) : (
		children
	);
}
