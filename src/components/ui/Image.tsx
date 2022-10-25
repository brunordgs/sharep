import clsx from 'clsx';
import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

export function Image({
	src,
	alt,
	layout = 'fill',
	objectFit = 'contain',
	className,
	...props
}: ImageProps) {
	const [loading, setLoading] = useState(true);

	return (
		<div className={clsx('relative', className)}>
			<NextImage
				src={src}
				alt={alt}
				layout={layout}
				objectFit={objectFit}
				className={clsx(
					loading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100',
					'select-none duration-700 ease-in-out',
				)}
				onLoadingComplete={() => setLoading(false)}
				{...props}
			/>
		</div>
	);
}
