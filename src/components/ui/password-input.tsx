'use client';
import { ComponentPropsWithRef, forwardRef, useState } from 'react';
import { Input } from './input';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(
	({ ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div className="relative w-full">
				<Input ref={ref} type={showPassword ? 'text' : 'password'} {...props} />
				<button
					type="button"
					className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
					onClick={() => setShowPassword(!showPassword)}
				>
					{!showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
				</button>
			</div>
		);
	},
);

PasswordInput.displayName = 'PasswordInput';
