import clsx from 'clsx';
import { HtmlHTMLAttributes } from 'react';

export function Card({ className, children }: HtmlHTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('bg-white rounded-md p-6 border border-zinc-200 shadow-sm', className)}>
			{children}
		</div>
	);
}
