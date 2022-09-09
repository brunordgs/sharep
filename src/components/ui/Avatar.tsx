import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
	size?: 'xs' | 'sm' | 'base' | 'md';
	hasBorder?: boolean;
}

export function Avatar({ size = 'base', hasBorder = false, ...props }: Props) {
	return (
		<div
			className={clsx(
				{
					'w-8 h-8': size === 'xs',
					'w-10 h-10': size === 'sm',
					'w-16 h-16': size === 'base',
					'w-36 h-36': size === 'md',
					'border-4 border-zinc-100 dark:border-zinc-900': hasBorder,
				},
				'relative rounded-full',
			)}
		>
			<Image
				layout="fill"
				objectFit="contain"
				className="rounded-full"
				alt={props.alt}
				{...props}
			/>
		</div>
	);
}
