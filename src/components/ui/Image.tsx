import { cx } from 'class-variance-authority';
import NextImage, { ImageProps } from 'next/legacy/image';
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
		<div className={cx('relative', className)}>
			<NextImage
				src={src}
				alt={alt}
				layout={layout}
				objectFit={objectFit}
				className={cx(
					loading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100',
					'select-none duration-700 ease-in-out',
				)}
				onLoadingComplete={() => setLoading(false)}
				{...props}
			/>
		</div>
	);
}
