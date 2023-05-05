import { type Props as LinkButtonProps } from '@ui/Buttons/LinkButton';
import { cx } from 'class-variance-authority';
import Link from 'next/link';

export function MobileItem({ href, children, className, ...props }: LinkButtonProps) {
	return (
		<Link
			href={href as string}
			className={cx(
				'flex items-center justify-center gap-2 w-full p-5 border-b dark:border-zinc-800 last:border-0 text-center cursor-pointer hover:text-black dark:hover:text-white font-bold transition-all ease-out',
				className,
			)}
			{...props}
		>
			{children}
		</Link>
	);
}
