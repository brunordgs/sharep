import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export interface Props {
	color?: keyof typeof BUTTON_COLORS;
	variant?: 'base' | 'outlined';
	size?: 'small' | 'default' | 'large' | 'custom';
	fontSize?: 'xs' | 'sm' | 'base' | 'lg';
	// leftIcon?: IconType | string;
	// rightIcon?: IconType | string;
}

type ButtonProps = Props & ComponentPropsWithoutRef<'button'>;

export const BUTTON_COLORS = {
	primary: {
		base: 'bg-rose-600 dark:bg-rose-500 text-rose-100 hover:text-white border border-rose-600 dark:border-rose-500 rounded-md shadow-md',
		outlined:
			'bg-transparent text-rose-600 dark:text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 border border-rose-400 dark:border-rose-500 rounded-md shadow-md',
		disabled: {
			base: 'bg-zinc-400/40 dark:bg-zinc-700 text-zinc-400 dark:text-opacity-40 dark:text-zinc-200 border border-transparent cursor-not-allowed rounded-md shadow-md',
			outlined: '',
		},
	},
	success: {
		base: 'bg-teal-600 dark:bg-teal-500 text-zinc-100 hover:text-white border border-teal-600 dark:border-teal-500 rounded-md shadow-md',
		outlined: '',
		disabled: {
			base: '',
			outlined: '',
		},
	},
	link: {
		base: 'text-sky-700 hover:text-sky-800 dark:text-sky-500 dark:hover:text-sky-400',
		outlined: '',
		disabled: {
			base: '',
			outlined: '',
		},
	},
	unstyled: {
		base: '',
		outlined: '',
		disabled: {
			base: '',
			outlined: '',
		},
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
	variant = 'base',
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
				props.disabled
					? colorStyles.disabled[variant]
					: variant === 'outlined'
					? colorStyles.outlined
					: colorStyles.base,
				BUTTON_FONT_SIZES[fontSize],
				{
					'px-6 py-4': size === 'large',
					'px-4 py-2': size === 'default' && !['unstyled', 'link'].includes(color),
					'px-2 py-1': size === 'small',
					'': size === 'custom',
				},
				`flex items-center justify-center transition-all ease-out leading-5 font-medium focus:outline-none`,
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
