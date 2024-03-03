import { Text } from '@ui/Typography/Text';

interface Props {
	username: string;
}

export function ProfileNotFound({ username }: Props) {
	return (
		<>
			<div className="bg-gradient-to-b from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 h-48 rounded-b-2xl" />
			<div className="-mt-20 mx-4">
				<div className="flex items-end">
					<div className="bg-zinc-200 dark:bg-zinc-800 w-36 h-36 border-4 border-zinc-100 dark:border-zinc-900 rounded-full" />
				</div>

				<div className="mt-4">
					<Text size="xl" weight="bold" className="md:text-2xl md:leading-none">
						@{username}
					</Text>
				</div>

				<div className="flex justify-center text-center mt-20 mb-32">
					<div>
						<Text className="text-3xl font-bold">This account doesn&apos;t exist</Text>
						<Text size="sm" className="text-zinc-500 dark:text-zinc-400">
							Try searching for another.
						</Text>
					</div>
				</div>
			</div>
		</>
	);
}
