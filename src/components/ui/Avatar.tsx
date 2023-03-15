import clsx from 'clsx';
import Image from 'next/legacy/image';

interface Props {
	src: string;
	size?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
	hasBorder?: boolean;
	alt?: string;
}

export function Avatar({ src, size = 'md', hasBorder = false, alt }: Props) {
	return (
		<div>
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
					'relative rounded-full overflow-hidden',
				)}
			>
				<Image
					src={src}
					layout="fill"
					objectFit="contain"
					className="rounded-full"
					placeholder="blur"
					blurDataURL={src as string}
					alt={alt ?? ''}
				/>
			</div>
		</div>
	);
}
