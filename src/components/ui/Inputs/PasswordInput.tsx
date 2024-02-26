// import { Eye, EyeSlash } from 'phosphor-react';
import { forwardRef, useState } from 'react';
import { Input, INPUT_COLORS } from './Input';

interface Props {
	color?: keyof typeof INPUT_COLORS;
	error: string | undefined;
}

export const PasswordInput = forwardRef<Props, Props>(({ error, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative w-full">
			<Input ref={ref} type={showPassword ? 'text' : 'password'} error={error} {...props} />
			<div
				className="absolute top-2 right-4 text-zinc-500 dark:text-zinc-400 cursor-pointer"
				onClick={() => setShowPassword(!showPassword)}
			>
				{/* {!showPassword ? <Eye size={22} weight="bold" /> : <EyeSlash size={22} weight="bold" />} */}
			</div>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';
