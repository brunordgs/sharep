import clsx from 'clsx';
import { UseFormRegister } from 'react-hook-form';
import { Input, type Props as InputProps } from '../ui/Input';
import { ErrorMessage } from './ErrorMessage';
import { FormHelperText } from './FormHelperText';

type Props = {
	label: string;
	helperText?: string;
	register: UseFormRegister<any>;
} & InputProps;

export function FormField({
	as,
	color,
	label,
	helperText,
	inputAddon,
	register,
	error,
	name,
	...props
}: Props) {
	return (
		<div>
			<label
				htmlFor={name}
				className={clsx(
					{
						'text-rose-400': error,
					},
					'block font-bold text-sm mb-1 capitalize',
				)}
			>
				{label}
			</label>

			<div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-md">
				{inputAddon && (
					<div className="text-zinc-600 dark:text-zinc-300 text-sm bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-3 rounded-tl-md rounded-bl-md select-none">
						{inputAddon}
					</div>
				)}

				<Input
					as={as}
					color={color}
					inputAddon={inputAddon}
					error={error}
					{...register(name as string)}
					{...props}
				/>
			</div>

			<div className="mt-1">
				{!error ? (
					<FormHelperText>{helperText}</FormHelperText>
				) : (
					<ErrorMessage>{error}</ErrorMessage>
				)}
			</div>
		</div>
	);
}
