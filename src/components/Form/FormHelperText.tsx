import { cx } from 'class-variance-authority';
import { Text, type Props as TextProps } from '@ui/Typography/Text';

export function FormHelperText({ children, className }: TextProps) {
	return (
		<Text size="xs" className={cx('text-zinc-400', className)}>
			{children}
		</Text>
	);
}
