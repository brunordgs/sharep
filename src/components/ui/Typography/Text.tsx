import { FONT_WEIGHTS } from '@/shared/constants';
import { type Typography } from '@/shared/interfaces/Typography';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

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
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
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
		<Tag
			className={clsx(
				!className?.includes('text-[') && sizes[size],
				FONT_WEIGHTS[weight],
				transform,
				className,
			)}
			{...props}
		>
			{children}
		</Tag>
	);
}
