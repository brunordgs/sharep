import { HTMLAttributes } from 'react';
import { FONT_WEIGHTS } from '@/shared/constants';
import { type Typography } from '@/shared/interfaces/Typography';
import { cx } from 'class-variance-authority';

type Props = {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	size?: keyof typeof sizes;
} & HTMLAttributes<HTMLHeadingElement> &
	Typography;

const sizes = {
	inherit: '',
	base: 'text-base',
	sm: 'text-lg',
	md: 'text-xl',
	lg: 'text-2xl',
	xl: 'text-3xl',
	'2xl': 'text-4xl',
	'3xl': 'text-5xl',
	'4xl': 'text-6xl',
	'5xl': 'text-7xl',
};

export function Heading({
	as: Tag = 'h1',
	size = 'base',
	weight = 'bold',
	transform = 'normal-case',
	children,
	className,
	...props
}: Props) {
	return (
		<Tag className={cx(sizes[size], FONT_WEIGHTS[weight], transform, className)} {...props}>
			{children}
		</Tag>
	);
}
