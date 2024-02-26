import { cva, type VariantProps } from 'class-variance-authority';
import {
	type ButtonHTMLAttributes,
	type ForwardRefExoticComponent,
	type RefAttributes,
} from 'react';
import { type IconType } from 'react-icons';

export interface Props
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonStyles> {
	size?: 'small' | 'default' | 'large';
	fontSize?: 'xs' | 'sm' | 'base' | 'lg';
	icon?: {
		icon: IconType | ForwardRefExoticComponent<any & RefAttributes<SVGSVGElement>>;
		position: 'left' | 'right';
		className?: string;
	};
}

export const buttonStyles = cva(
	'inline-flex items-center justify-center gap-2 transition-all ease-out leading-5 font-medium focus:outline-none disabled:pointer-events-none',
	{
		variants: {
			intent: {
				primary:
					'bg-rose-600 dark:bg-rose-500 text-rose-100 hover:text-white border border-rose-600 dark:border-rose-500 rounded-md shadow-md disabled:bg-rose-500/70 disabled:border-rose-500/20 dark:disabled:bg-rose-500/60 dark:disabled:text-rose-100/60 dark:disabled:border-rose-500/40',
				success:
					'bg-teal-600 dark:bg-teal-500 text-zinc-100 hover:text-white border border-teal-600 dark:border-teal-500 rounded-md shadow-md',
				dark: 'bg-zinc-200 hover:text-black dark:hover:text-white dark:bg-zinc-900 rounded-md shadow-md',
				link: 'text-sky-700 hover:text-sky-800 dark:text-sky-500 dark:hover:text-sky-400',
			},
			fontSize: {
				xs: 'text-xs',
				sm: 'text-sm',
				base: 'text-base',
				lg: 'text-lg',
			},
			size: {
				small: 'px-2 py-1',
				default: 'px-4 py-2',
				large: 'px-6 py-4',
			},
		},
		defaultVariants: {
			intent: 'primary',
			size: 'default',
			fontSize: 'sm',
		},
	},
);

export function Button({ intent, size, icon, fontSize, className, children, ...props }: Props) {
	return (
		<button
			type={props.type ?? 'button'}
			className={buttonStyles({ intent, fontSize, size, className })}
			aria-label={props.title}
			{...props}
		>
			{icon?.position === 'left' && <icon.icon className={icon.className} />}
			{children}
			{icon?.position === 'right' && <icon.icon className={icon.className} />}
		</button>
	);
}
