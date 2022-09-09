import clsx from 'clsx';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'a'>;

export function MobileItem({ href, children, className, ...props }: Props) {
	return (
		<Link href={href as string}>
			<a
				className={clsx(
					'w-full p-5 border-b dark:border-zinc-800 last:border-0 flex items-center justify-center gap-2 text-center cursor-pointer hover:text-black dark:hover:text-white font-bold transition-colors duration-300',
					className,
				)}
				{...props}
			>
				{children}
			</a>
		</Link>
	);
}
