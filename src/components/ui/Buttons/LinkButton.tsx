import { type VariantProps } from 'class-variance-authority';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../button';
import { type Icon } from '@phosphor-icons/react';

interface Props
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		LinkProps,
		VariantProps<typeof buttonVariants> {
	href: string;
	leftIcon?: Icon;
	rightIcon?: Icon;
	disabled?: boolean;
}

export function LinkButton({
	href,
	className,
	variant,
	size,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	children,
	disabled,
	...props
}: Props) {
	return (
		<Link
			href={href}
			className={cn(buttonVariants({ variant, size, className }), {
				'pointer-events-none opacity-50': disabled,
			})}
			{...props}
		>
			<>
				{LeftIcon && <LeftIcon className="w-4 h-4" />}
				{children}
				{RightIcon && <RightIcon className="w-4 h-4" />}
			</>
		</Link>
	);
}
