import clsx from 'clsx';
import { Text, Props as TextProps } from '../ui/Typography/Text';

interface Props extends TextProps {
	helperText?: string;
}

export function FormHelperText({ helperText, className }: Props) {
	return (
		<Text size="xs" className={clsx('text-zinc-400', className)}>
			{helperText}
		</Text>
	);
}
