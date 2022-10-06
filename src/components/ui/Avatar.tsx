import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
	hasBorder?: boolean;
}

export function Avatar({ size = 'md', hasBorder = false, className, ...props }: Props) {
	return (
		<div
			className={clsx(
				{
					'w-8 h-8': size === 'xs',
					'w-10 h-10': size === 'sm',
					'w-12 h-12': size === 'base',
					'w-16 h-16': size === 'md',
					'w-36 h-36': size === 'lg',
					'border-4 border-zinc-100 dark:border-zinc-900': hasBorder,
				},
				'relative rounded-full',
				className,
			)}
		>
			<Image
				layout="fill"
				objectFit="contain"
				className="rounded-full"
				alt={props.alt ?? ''}
				{...props}
			/>
		</div>
	);
}
