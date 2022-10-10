import clsx from 'clsx';
import NextImage, { ImageProps } from 'next/image';

export function Image({
	src,
	alt,
	layout = 'fill',
	objectFit = 'contain',
	className,
	...props
}: ImageProps) {
	return (
		<div className={clsx('relative', className)}>
			<NextImage
				src={src}
				alt={alt}
				layout={layout}
				objectFit={objectFit}
				className="select-none"
				placeholder="blur"
				blurDataURL={src as string}
				draggable={false}
				{...props}
			/>
		</div>
	);
}
