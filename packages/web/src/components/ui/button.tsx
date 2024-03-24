import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';
import { type IconType } from 'react-icons';
import { Spinner } from '../spinner';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-destructive/70 disabled:border-destructive/20 dark:disabled:bg-destructive/60 dark:disabled:text-destructive-foreground/60 dark:disabled:border-destructive/40',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'size-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	leftIcon?: LucideIcon | IconType;
	rightIcon?: LucideIcon | IconType;
	isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			isLoading,
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{LeftIcon && <LeftIcon className="size-4 mr-2" />}
				{isLoading ? <Spinner /> : children}
				{RightIcon && <RightIcon className="size-4 ml-2" />}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };