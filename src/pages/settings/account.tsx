import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Buttons/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';

export default function SettingsAccount() {
	return (
		<>
			<Head>
				<title>Your account | sharep</title>
			</Head>

			<Container className="my-6">
				<main className="grid grid-cols-1 lg:grid-cols-4">
					<div>
						<div className="flex items-center gap-4 mb-4 lg:mb-0">
							<Avatar src="https://github.com/brunordgs.png" size="sm" />

							<div>
								<Text weight="bold">Bruno Rodrigues</Text>
								<Text size="xs">@brunordgs</Text>
							</div>
						</div>
					</div>

					<Card className="col-span-3">
						<header>
							<Heading as="h2" transform="italic" size="sm">
								Profile settings
							</Heading>
							<Text size="sm" className="text-zinc-400">Change identifying details for you account</Text>
						</header>

						<div className="mt-8 space-y-6">
							<div>
								<label htmlFor="username" className="block font-bold text-sm mb-1 capitalize">
									Username
								</label>

								<div className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-md">
									<div className="text-zinc-400 dark:text-zinc-300 text-sm bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-2 rounded-tl-md rounded-bl-md select-none">
										sharep.com/@
									</div>
									<input
										type="text"
										id="username"
										className="bg-zinc-100 dark:bg-zinc-900 rounded-r-md border border-zinc-200 dark:border-zinc-700 px-2 h-10 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
										placeholder="Your username..."
									/>
								</div>
							</div>

							<div>
								<label htmlFor="displayName" className="block font-bold text-sm mb-1 capitalize">
									Display Name
								</label>

								<input
									type="text"
									id="displayName"
									className="bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700 px-2 h-10 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
									placeholder="Your display name..."
								/>
							</div>

							<div>
								<label htmlFor="bio" className="block font-bold text-sm mb-1 capitalize">
									Bio
								</label>

								<div>
									<textarea
										id="bio"
										rows={4}
										className="bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700 p-2 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-none"
									/>

									<Text size="xs" className="text-zinc-400">
										Write a few sentences about yourself.
									</Text>
								</div>
							</div>
						</div>

						<div className="flex justify-end mt-6">
							<Button>Update</Button>
						</div>
					</Card>
				</main>
			</Container>
		</>
	);
}
