import { ComponentPropsWithoutRef } from 'react';
import { FormProvider } from 'react-hook-form';

interface Props extends ComponentPropsWithoutRef<'form'> {
	methods: any;
}

export function Form({ methods, children, ...props }: Props) {
	return (
		<FormProvider {...methods}>
			<form {...props}>{children}</form>
		</FormProvider>
	);
}
