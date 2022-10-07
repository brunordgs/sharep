import clsx from 'clsx';
import Link, { type LinkProps as NextLinkProps } from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { BUTTON_COLORS, BUTTON_FONT_SIZES, type Props as ButtonProps } from './Button';

export type Props = {
	isExternal?: boolean;
} & ComponentPropsWithoutRef<'a'> &
	ButtonProps &
	NextLinkProps;

export function LinkButton({
	color = 'primary',
	variant = 'base',
	size = 'default',
	fontSize = 'sm',
	// leftIcon: LeftIcon,
	// rightIcon: RightIcon,
	isExternal = false,
	className,
	children,
	...props
}: Props) {
	const colorStyles = BUTTON_COLORS[color] ?? BUTTON_COLORS.primary;

	return (
		<Link href={props.href}>
			<a
				className={clsx(
					variant === 'outlined' ? colorStyles.outlined : colorStyles.base,
					BUTTON_FONT_SIZES[fontSize],
					{
						'px-6 py-4': size === 'large',
						'px-4 py-2': size === 'default' && !['unstyled', 'link'].includes(color),
						'px-2 py-1': size === 'small',
						'': size === 'custom',
					},
					'flex items-center justify-center transition-all ease-out gap-2',
					className,
				)}
				target={isExternal ? '_blank' : '_self'}
				rel="noopener noreferrer"
				{...props}
			>
				{/* {LeftIcon && <LeftIcon className="mr-2" />} */}
				{children}
				{/* {RightIcon && <RightIcon className="ml-2" />} */}
			</a>
		</Link>
	);
}
