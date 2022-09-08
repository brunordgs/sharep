import { FileSearch } from 'phosphor-react';
import { Card } from '../ui/Card';
import { Text } from '../ui/Typography/Text';

export function NoProjectFound() {
	return (
		<Card className="lg:col-span-4 row-span-2">
			<div className="flex flex-col items-center lg:justify-center h-full text-zinc-400">
				<FileSearch size={96} weight="thin" />

				<Text className="max-w-md text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta unde mollitia consectetur
					expedita facilis.
				</Text>
			</div>
		</Card>
	);
}
