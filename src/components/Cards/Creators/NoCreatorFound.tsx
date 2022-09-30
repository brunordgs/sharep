import { Text } from '@/components/ui/Typography/Text';
import { User } from 'phosphor-react';

export function NoCreatorFound() {
	return (
		<div className="flex flex-col items-center lg:justify-center h-full text-zinc-400 p-6">
			<User size={72} weight="light" />

			<Text size="xl" weight="bold" className="mt-2">
				No creator
			</Text>

			<Text size="sm" className="max-w-md text-center">
				There is no creator registered yet.
			</Text>
		</div>
	);
}
