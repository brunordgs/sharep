import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'img'> {
	size?: 'sm' | 'base' | 'md';
	hasBorder?: boolean;
}

export function Avatar({ size = 'base', hasBorder = false, ...props }: Props) {
	return (
		<img
			className={clsx(
				{
					'w-10': size === 'sm',
					'w-16': size === 'base',
					'w-36': size === 'md',
					'border-4 border-zinc-100 dark:border-zinc-900': hasBorder,
				},
				'rounded-full',
			)}
			{...props}
		/>
	);
}
