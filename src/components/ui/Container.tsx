import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export function Container({ className, children }: HTMLAttributes<HTMLDivElement>) {
	return <main className={clsx('container', className)}>{children}</main>;
}
