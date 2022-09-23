import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export interface Props {
	color?: keyof typeof BUTTON_COLORS;
	variant?: 'default' | 'outlined';
	size?: 'small' | 'default' | 'large' | 'custom';
	fontSize?: 'xs' | 'sm' | 'base' | 'lg';
	// leftIcon?: IconType | string;
	// rightIcon?: IconType | string;
}

type ButtonProps = Props & ComponentPropsWithoutRef<'button'>;

export const BUTTON_COLORS = {
	primary: {
		base: 'bg-rose-600 dark:bg-rose-500 text-zinc-100 hover:text-white border border-rose-500 dark:border-rose-600 hover:border-rose-400 dark:hover:border-rose-400 leading-5 font-medium focus:outline-none rounded-md shadow-md',
		outlined:
			'bg-transparent text-rose-600 dark:text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 border border-rose-400 dark:border-rose-500 hover:border-rose-400 dark:hover:border-rose-400 leading-5 font-medium focus:outline-none rounded-md shadow-md',
	},
	unstyled: {
		base: '',
		outlined: '',
	},
};

export const BUTTON_FONT_SIZES = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
};

export function Button({
	color = 'primary',
	variant = 'default',
	size = 'default',
	// leftIcon: LeftIcon,
	// rightIcon: RightIcon,
	fontSize = 'sm',
	className,
	children,
	...props
}: ButtonProps) {
	const colorStyles = BUTTON_COLORS[color] ?? BUTTON_COLORS.primary;

	return (
		<button
			className={clsx(
				variant === 'outlined' ? colorStyles.outlined : colorStyles.base,
				BUTTON_FONT_SIZES[fontSize],
				{
					'px-6 py-4': size === 'large',
					'px-4 py-2': size === 'default' && !['unstyled', 'link'].includes(color),
					'px-2 py-1': size === 'small',
					'': size === 'custom',
				},
				`flex items-center justify-center transition-all duration-300`,
				className,
			)}
			aria-label={props.title}
			{...props}
		>
			{/* {LeftIcon && <LeftIcon className="mr-2" />} */}
			{children}
			{/* {RightIcon && <RightIcon className="ml-2" />} */}
		</button>
	);
}
