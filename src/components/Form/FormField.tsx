import clsx from 'clsx';
import { createElement, ReactNode } from 'react';
import { FormHelperText } from './FormHelperText';

interface FieldProps {
	field: 'input' | 'select' | 'textarea';
}

type GenericFieldHTMLAttributes =
	| JSX.IntrinsicElements['input']
	| JSX.IntrinsicElements['select']
	| JSX.IntrinsicElements['textarea'];

type Props = GenericFieldHTMLAttributes & {
	as?: FieldProps['field'];
	label: string;
	helperText?: string;
	inputAddon?: ReactNode;
};

export function FormField({ as, label, helperText, inputAddon, name, ...props }: Props) {
	const asElement = as ?? 'input';

	return (
		<div>
			<label htmlFor={name} className="block font-bold text-sm mb-1 capitalize">
				{label}
			</label>

			<div className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-md">
				{inputAddon && (
					<div className="text-zinc-600 dark:text-zinc-300 text-sm bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-3 rounded-tl-md rounded-bl-md select-none">
						{inputAddon}
					</div>
				)}

				{createElement(asElement, {
					name,
					id: name,
					className: clsx(
						{
							'h-10': asElement !== 'textarea',
						},
						inputAddon ? 'rounded-r-md' : 'rounded-md',
						'bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 px-2 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 outline-none focus:border-2 focus:border-rose-500 dark:focus:border-rose-900',
					),
					...props,
				})}
			</div>

			<FormHelperText helperText={helperText} className="mt-1" />
		</div>
	);
}
