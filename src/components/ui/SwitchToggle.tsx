import { Switch } from '@headlessui/react';
import { Text } from './Typography/Text';
import { cx } from 'class-variance-authority';

interface Props {
	title: string;
	enabled: boolean;
	setEnabled(enabled: boolean): void;
}

export function SwitchToggle({ title, enabled, setEnabled }: Props) {
	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={cx(
				enabled ? 'bg-rose-600' : 'bg-rose-400',
				'relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
			)}
		>
			<Text as="span" className="sr-only">
				{title}
			</Text>

			<Text
				as="span"
				aria-hidden="true"
				className={cx(
					enabled ? 'translate-x-4' : 'translate-x-0',
					'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
				)}
			/>
		</Switch>
	);
}
