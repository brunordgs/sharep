import { cx } from 'class-variance-authority';
import { HtmlHTMLAttributes } from 'react';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
	noPadding?: boolean;
}

export function Card({ noPadding, className, children }: Props) {
	return (
		<div
			className={cx(
				{ 'p-6': !noPadding },
				'bg-white dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700 shadow-sm',
				className,
			)}
		>
			{children}
		</div>
	);
}
