import { MinusCircle } from 'phosphor-react';
import { Text, type Props as TextProps } from '../ui/Typography/Text';

export function ErrorMessage({ children, ...props }: TextProps) {
	return (
		<Text size="xs" weight="medium" className="text-rose-400 flex items-end gap-2" {...props}>
			<MinusCircle weight="fill" size={18} />
			{children}
		</Text>
	);
}
