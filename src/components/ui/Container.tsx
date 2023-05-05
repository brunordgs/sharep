import { cx } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	noMargin?: boolean;
}

export function Container({ noMargin = false, className, children }: Props) {
	return (
		<main
			className={cx(
				{ 'my-6': !noMargin },
				'container',
				className,
			)}
		>
			{children}
		</main>
	);
}
