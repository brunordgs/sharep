import clsx from 'clsx';
import Link from 'next/link';
import { type ComponentPropsWithoutRef } from 'react';
import type { UrlObject } from 'url';

const variants = {
	primary:
		'bg-zinc-200/60 hover:bg-zinc-200 hover:text-black hover:dark:text-white dark:bg-zinc-800 dark:hover:bg-zinc-700',
	secondary:
		'bg-zinc-100/40 hover:bg-zinc-100/20 dark:bg-zinc-800/20 dark:hover:bg-zinc-800/40 hover:text-white',
	tertiary:
		'bg-zinc-200/60 hover:bg-zinc-200 hover:text-black hover:dark:text-white dark:bg-zinc-600 dark:hover:bg-zinc-700',
	unstyled: '',
};

type Props = {
	variant?: keyof typeof variants;
	isAnchor?: boolean;
	icon: JSX.Element;
	href?: string | UrlObject;
} & ComponentPropsWithoutRef<'button'> &
	ComponentPropsWithoutRef<'a'>;

export function IconButton({
	variant = 'primary',
	isAnchor = false,
	href = '',
	icon,
	className,
	...props
}: Props) {
	const variantStyles = variants[variant];

	return isAnchor ? (
		<Link
			href={href}
			className={clsx(
				{ 'p-2': !className?.includes('p-') },
				'inline-flex items-center justify-center transition-all ease-out rounded-full',
				variantStyles,
				className,
			)}
			title={props.title}
			{...props}
		>
			{icon}
		</Link>
	) : (
		<button
			type="button"
			className={clsx(
				{ 'p-2': !className?.includes('p-') },
				'inline-flex items-center justify-center transition-all ease-out rounded-full',
				variantStyles,
				className,
			)}
			{...props}
		>
			{icon}
		</button>
	);
}
