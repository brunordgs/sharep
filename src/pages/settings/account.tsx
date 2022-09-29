import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Buttons/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { useAuth } from '@/hooks/useAuth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function SettingsAccount() {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		// TODO: Improve no auth validation
		if (!auth?.session) {
			router.push('/');
			return;
		}
	}, [auth, router]);

	if (!auth) return;

	return (
		<>
			<Head>
				<title>Your account | sharep</title>
			</Head>

			<Container className="my-6">
				<main className="grid grid-cols-1 lg:grid-cols-4">
					<div>
						<div className="flex items-center gap-4 mb-4 lg:mb-0">
							<Avatar src={auth.user.image} size="sm" />

							<div>
								<Text weight="bold">{auth.user.name}</Text>
								<Text size="xs">@{auth.user.username}</Text>
							</div>
						</div>
					</div>

					<Card className="col-span-3">
						<header>
							<Heading as="h2" transform="italic" size="sm">
								Profile settings
							</Heading>
							<Text size="sm" className="text-zinc-400">
								Change identifying details for you account
							</Text>
						</header>

						<div className="mt-8 space-y-6">
							<div>
								<label htmlFor="username" className="block font-bold text-sm mb-1 capitalize">
									Username
								</label>

								<div className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-md">
									<div className="text-zinc-600 dark:text-zinc-300 text-sm bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-2 rounded-tl-md rounded-bl-md select-none">
										sharep.com/@
									</div>
									<input
										type="text"
										id="username"
										value={auth.user.username}
										className="bg-zinc-100 dark:bg-zinc-900 rounded-r-md border-2 border-zinc-200 dark:border-zinc-700 px-2 h-10 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 outline-none focus:border-2 focus:border-rose-500 dark:focus:border-rose-900"
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
									value={auth.user.name}
									className="bg-zinc-100 dark:bg-zinc-900 rounded-md border-2 border-zinc-200 dark:border-zinc-700 px-2 h-10 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 outline-none focus:border-2 focus:border-rose-500 dark:focus:border-rose-900"
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
										className="bg-zinc-100 dark:bg-zinc-900 rounded-md border-2 border-zinc-200 dark:border-zinc-700 p-2 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-none outline-none focus:border-rose-500 dark:focus:border-rose-900"
									/>

									<Text size="xs" className="text-zinc-400">
										Write a few sentences about yourself.
									</Text>
								</div>
							</div>

							<div>
								<div className="grid sm:grid-cols-2 gap-4 mt-4">
									<div>
										<label htmlFor="github" className="block font-bold text-sm mb-1 capitalize">
											Github
										</label>

										<div className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-md">
											<div className="text-zinc-600 dark:text-zinc-300 text-sm bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-3 rounded-tl-md rounded-bl-md select-none">
												<FaGithub />
											</div>

											<input
												type="text"
												id="github"
												value={auth.user.username}
												className="bg-zinc-100 dark:bg-zinc-900 rounded-r-md border-2 border-zinc-200 dark:border-zinc-700 px-2 h-10 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 outline-none focus:border-2 focus:border-rose-500 dark:focus:border-rose-900"
												placeholder="Your Github..."
											/>
										</div>
									</div>

									<div>
										<label htmlFor="twitter" className="block font-bold text-sm mb-1 capitalize">
											Twitter
										</label>

										<div className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-md">
											<div className="text-zinc-500 dark:text-zinc-300 text-sm bg-zinc-200 dark:bg-zinc-700 h-10 flex items-center px-3 rounded-tl-md rounded-bl-md select-none">
												<FaTwitter />
											</div>

											<input
												type="text"
												id="twitter"
												className="bg-zinc-100 dark:bg-zinc-900 rounded-r-md border-2 border-zinc-200 dark:border-zinc-700 px-2 h-10 text-sm w-full placeholder:text-zinc-300 dark:placeholder:text-zinc-600 outline-none focus:border-2 focus:border-rose-500 dark:focus:border-rose-900"
												placeholder="Your Twitter..."
											/>
										</div>
									</div>
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
