import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { FileSearch } from 'phosphor-react';
import { Text } from '../../ui/Typography/Text';

export function NoProjectFound() {
	return (
		<div className="flex flex-col items-center lg:justify-center h-full text-zinc-400 p-6">
			<FileSearch size={96} weight="thin" />

			<Text className="max-w-md text-center mt-4">
				There is no project registered yet, you can contact{' '}
				<LinkButton
					fontSize="base"
					href="/@brunordgs"
					color="unstyled"
					className="hover:text-black dark:hover:text-white underline"
				>
					@brunordgs
				</LinkButton>{' '}
				to provide those informations.
			</Text>
		</div>
	);
}
