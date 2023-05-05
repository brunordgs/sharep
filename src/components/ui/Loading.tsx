import { type ComponentPropsWithoutRef } from 'react';
import { Spinner } from '../Icons/Spinner';
import { cx } from 'class-variance-authority';

interface Props extends ComponentPropsWithoutRef<'div'> {
	loading: boolean;
}

export function Loading({ loading, className, children }: Props) {
	return (
		<>
			{!loading ? (
				<>{children}</>
			) : (
				<div className={cx('flex justify-center items-center h-full', className)}>
					<Spinner className="w-8 h-8 text-gray-200 dark:text-black/20 fill-rose-600" />
				</div>
			)}
		</>
	);
}
