import clsx from 'clsx';
import { createElement, ReactNode } from 'react';

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

const INPUT_COLORS = {
	primary: {
		base: 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 placeholder:text-zinc-300 dark:placeholder:text-zinc-600',
	},
	secondary: {
		base: 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 placeholder:text-zinc-300 dark:placeholder:text-zinc-500',
	},
};

export function Input({ as, color = 'primary', inputAddon, error, name, ...props }: Props) {
	const asElement = as ?? 'input';
	const colorStyles = INPUT_COLORS[color] ?? INPUT_COLORS.primary;

	return createElement(asElement, {
		id: name,
		className: clsx(
			colorStyles.base,
			{
				'h-10': asElement !== 'textarea',
				'border-rose-400 active:border-rose-400 focus:border-rose-400 dark:active:border-rose-400 dark:border-rose-400 dark:focus:border-rose-400':
					error,
			},
			inputAddon ? 'rounded-r-md' : 'rounded-md',
			'border-2 p-2 text-sm w-full outline-none focus:border-rose-700 dark:focus:border-rose-900',
		),
		...props,
	});
}
