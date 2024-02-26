// import { Warning, WarningCircle } from 'phosphor-react';
import { Text } from './Typography/Text';
import { cx } from 'class-variance-authority';

interface Props {
	color?: keyof typeof ALERT_COLORS;
	title: string;
	description: string;
}

const ALERT_COLORS = {
	primary: {
		bg: 'bg-red-50 border-red-500 dark:bg-red-100',
		title: 'text-red-800',
		text: 'text-red-700',
		icon: 'text-red-400',
	},
	warning: {
		bg: 'bg-amber-50 border-amber-500 dark:bg-amber-100',
		title: 'text-amber-800',
		text: 'text-amber-700',
		icon: 'text-amber-400',
	},
};

export function Alert({ color = 'primary', title, description }: Props) {
	const colorStyles = ALERT_COLORS[color] ?? ALERT_COLORS.primary;
	// const Icon = color === 'primary' ? WarningCircle : Warning;

	return (
		<div className={cx(colorStyles.bg, 'rounded-md border-2 p-4')}>
			<header className="flex items-center gap-4 mb-2">
				{/* <Icon weight="fill" size={20} className={colorStyles.icon} /> */}

				<Text className={cx(colorStyles.title, 'font-semibold')}>{title}</Text>
			</header>

			<Text size="sm" className={cx(colorStyles.text, 'ml-9')}>
				{description}
			</Text>
		</div>
	);
}
