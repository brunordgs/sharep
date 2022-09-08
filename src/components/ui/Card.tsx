import clsx from 'clsx';
import { HtmlHTMLAttributes } from 'react';

export function Card({ className, children }: HtmlHTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('bg-white dark:bg-zinc-800 rounded-md p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm', className)}>
			{children}
		</div>
	);
}
