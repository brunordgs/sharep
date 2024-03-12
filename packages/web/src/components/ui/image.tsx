'use client';
import { cn } from '@/lib/utils';
import NextImage, { type ImageProps } from 'next/image';

export function Image({ src, className, alt, ...props }: ImageProps) {
	return (
		<NextImage
			src={src}
			className={cn('blur-sm select-none duration-700 ease-in-out', className)}
			onLoadingComplete={(img) => img.classList.remove(...['blur-sm'])}
			width={0}
			height={0}
			sizes="100vw"
			alt={alt}
			{...props}
		/>
	);
}
