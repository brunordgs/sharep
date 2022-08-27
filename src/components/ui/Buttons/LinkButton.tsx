import clsx from 'clsx';
import Link, { LinkProps as NextLinkProps } from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { BUTTON_COLORS, BUTTON_FONT_SIZES, Props as ButtonProps } from './Button';

type Props = {
	isExternal?: boolean;
} & ComponentPropsWithoutRef<'a'> &
	ButtonProps &
	NextLinkProps;

export function LinkButton({
	color = 'primary',
	variant = 'default',
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
					variant === 'outlined' ? `${colorStyles.outlined}` : `${colorStyles.base}`,
					BUTTON_FONT_SIZES[fontSize],
					{
						'px-6 py-4': size === 'large',
						'px-4 py-2': size === 'default' && !['unstyled', 'link'].includes(color),
						'px-2 py-1': size === 'small',
						'': size === 'custom',
					},
					'inline-flex items-center justify-center transition-all duration-300 ease-out dark:font-medium',
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
