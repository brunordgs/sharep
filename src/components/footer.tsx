'use client';

import { usePathname } from 'next/navigation';

interface Props {
	allowFooter?: boolean;
}

export function Footer({ allowFooter }: Props) {
	const pathname = usePathname();

	const excludeRoutes = ['/'];

	if (!excludeRoutes.includes(pathname) || allowFooter) {
		return (
			<div className="flex justify-center text-xs text-zinc-500">
				Sharep &copy; {new Date().getFullYear()}
			</div>
		);
	}
}
