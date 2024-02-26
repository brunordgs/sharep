import { Children } from '@/shared/interfaces/Children';
import { Text } from './ui/Typography/Text';
import { TextSearch } from 'lucide-react';

interface Props extends Children {
	title: string;
	description: string;
}

export function NoDataFound({ title, description, children }: Props) {
	return (
		<div className="flex flex-col items-center lg:justify-center h-full p-6">
			<TextSearch className="w-20 h-20" />

			<Text size="xl" weight="bold" className="mt-2">
				{title}
			</Text>

			<Text size="sm" className="max-w-md text-center text-zinc-400">
				{description}
			</Text>

			{children}
		</div>
	);
}
