import Link, { type LinkProps } from 'next/link';
import { type ComponentPropsWithoutRef } from 'react';
import { buttonStyles, type Props as ButtonProps } from './Button';

export type Props = {
	isExternal?: boolean;
} & ComponentPropsWithoutRef<'a'> &
	ButtonProps &
	LinkProps;

export function LinkButton({
	intent,
	size,
	fontSize,
	icon,
	isExternal = false,
	className,
	children,
	...props
}: Props) {
	return (
		<Link
			className={buttonStyles({ intent, fontSize, size, className })}
			target={isExternal ? '_blank' : '_self'}
			rel="noopener noreferrer"
			{...props}
		>
			{icon?.position === 'left' && <icon.icon className={icon.className} />}
			{children}
			{icon?.position === 'right' && <icon.icon className={icon.className} />}
		</Link>
	);
}
