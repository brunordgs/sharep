import clsx from 'clsx';
import { Text, type Props as TextProps } from '../ui/Typography/Text';

export function FormHelperText({ children, className }: TextProps) {
	return (
		<Text size="xs" className={clsx('text-zinc-400', className)}>
			{children}
		</Text>
	);
}
