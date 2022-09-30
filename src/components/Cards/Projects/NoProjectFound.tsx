import { FileSearch } from 'phosphor-react';
import { Text } from '../../ui/Typography/Text';

export function NoProjectFound() {
	return (
		<div className="flex flex-col items-center lg:justify-center h-full text-zinc-400 p-6">
			<FileSearch size={72} weight="thin" />

			<Text size="xl" weight="bold" className="mt-2">
				No projects
			</Text>

			<Text size="sm" className="max-w-md text-center">
				There is no project registered yet.
			</Text>
		</div>
	);
}
