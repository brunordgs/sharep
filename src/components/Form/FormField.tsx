import { cx } from 'class-variance-authority';
import { useFormContext } from 'react-hook-form';
import { Input, type Props as InputProps } from '@ui/Inputs/Input';
import { PasswordInput } from '@ui/Inputs/PasswordInput';
import { Text } from '@ui/Typography/Text';
import { ErrorMessage } from './ErrorMessage';
import { FormHelperText } from './FormHelperText';

type Props = {
	label: string;
	helperText?: string;
	isRequired?: boolean;
	isPassword?: boolean;
} & InputProps;

export function FormField({
	as,
	color,
	label,
	helperText,
	inputAddon,
	error,
	name,
	isRequired = false,
	isPassword = false,
	...props
}: Props) {
	const { register } = useFormContext();

	return (
		<div>
			<label
				htmlFor={name}
				className={cx(
					{
						'text-rose-400': error,
					},
					'block font-bold text-sm mb-1 capitalize',
				)}
			>
				{label}
				{isRequired && (
					<Text as="span" className="text-red-500 dark:text-red-400">
						{' '}
						*
					</Text>
				)}
			</label>

			<div className="flex items-center bg-zinc-200 dark:bg-zinc-900 rounded-md">
				{inputAddon && (
					<div
						className={cx(
							{
								'text-sm': typeof inputAddon === 'string',
							},
							'text-zinc-700 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-3 rounded-tl-md rounded-bl-md select-none',
						)}
					>
						{inputAddon}
					</div>
				)}

				{isPassword ? (
					<PasswordInput
						color="secondary"
						error={error}
						{...props}
						{...register(name as string)}
					/>
				) : (
					<Input
						as={as}
						color={color}
						inputAddon={inputAddon}
						error={error}
						{...props}
						{...register(name as string)}
					/>
				)}
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
