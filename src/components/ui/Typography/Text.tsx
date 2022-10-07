import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { FONT_WEIGHTS } from '@/shared/constants';
import { type Typography } from '@/shared/interfaces/Typography';

export type Props = {
	as?: 'p' | 'span' | 'small';
	size?: keyof typeof sizes;
} & HTMLAttributes<HTMLParagraphElement> &
	Typography;

const sizes = {
	inherit: '',
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	md: 'text-md',
	lg: 'text-lg',
	xl: 'text-xl',
};

export function Text({
	as: Tag = 'p',
	size = 'base',
	weight = 'normal',
	transform = 'normal-case',
	children,
	className,
	...props
}: Props) {
	return (
		<Tag className={clsx(sizes[size], FONT_WEIGHTS[weight], transform, className)} {...props}>
			{children}
		</Tag>
	);
}
