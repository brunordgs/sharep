import { cx } from 'class-variance-authority';
import { createElement, forwardRef, ReactNode } from 'react';

interface FieldProps {
	field: 'input' | 'select' | 'textarea';
}

type GenericFieldHTMLAttributes =
	| JSX.IntrinsicElements['input']
	| JSX.IntrinsicElements['select']
	| JSX.IntrinsicElements['textarea'];

export type Props = GenericFieldHTMLAttributes & {
	color?: keyof typeof INPUT_COLORS;
	as?: FieldProps['field'];
	inputAddon?: ReactNode;
	error: string | undefined;
};

export const INPUT_COLORS = {
	primary: {
		base: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-200',
	},
	secondary: {
		base: 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
	},
};

export const Input = forwardRef<Props, Props>(
	({ as, color = 'primary', inputAddon, error, name, ...props }, ref) => {
		const asElement = as ?? 'input';
		const colorStyles = INPUT_COLORS[color] ?? INPUT_COLORS.primary;

		return createElement(asElement, {
			name,
			id: name,
			ref,
			className: cx(
				colorStyles.base,
				{
					'h-10': asElement !== 'textarea',
					'!border-rose-400 active:border-rose-400 focus:border-rose-400 dark:active:border-rose-400 dark:border-rose-400 dark:focus:border-rose-400':
						error,
				},
				inputAddon ? 'rounded-r-md' : 'rounded-md',
				'border-2 p-2 text-sm w-full outline-none focus:border-zinc-300 dark:focus:border-zinc-500',
			),
			...props,
		});
	},
);

Input.displayName = 'Input';
