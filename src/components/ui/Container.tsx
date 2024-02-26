import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children }: Props) {
	return <main className={cn('container mt-12', className)}>{children}</main>;
}
