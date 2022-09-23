import { Switch } from '@headlessui/react';
import clsx from 'clsx';

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
			className={clsx(
				enabled ? 'bg-rose-600 dark:bg-rose-900' : 'bg-rose-500 dark:bg-rose-700',
				'relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
			)}
		>
			<span className="sr-only">{title}</span>
			<span
				aria-hidden="true"
				className={clsx(
					enabled ? 'translate-x-4' : 'translate-x-0',
					'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
				)}
			/>
		</Switch>
	);
}
