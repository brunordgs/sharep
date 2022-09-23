import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { Spinner } from '../Icons/Spinner';

interface Props extends ComponentPropsWithoutRef<'div'> {
	loading: boolean;
}

export function Loading({ loading, className, children }: Props) {
	return (
		<>
			{!loading ? (
				<>{children} </>
			) : (
				<div className={clsx('flex justify-center items-center h-full', className)}>
					<Spinner />
				</div>
			)}
		</>
	);
}
