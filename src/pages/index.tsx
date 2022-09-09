import { NoProjectFound } from '@/components/Projects/NoProjectFound';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { PopularUsersCard } from '@/components/User/PopularUsersCard';
import projects from '@/data/projects.json';
import Head from 'next/head';
import { CaretDown } from 'phosphor-react';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | sharep</title>
			</Head>

			<Container className="my-6">
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					Your next favorite thing
					<CaretDown className="animate-bounce" />
				</Heading>

				<div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 mt-6">
					<Card className="lg:col-span-4 row-span-2" noPadding>
						{projects.length ? (
							projects.map(({ url, title, name, description, source }) => (
								<LinkButton
									key={url}
									href={url}
									isExternal
									color="unstyled"
									className="border-b border-zinc-200 last:border-b-0 lg:last:border-b dark:border-zinc-700 p-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full"
								>
									<div className="flex items-center gap-4">
										<div className="bg-rose-500 h-16 w-16 rounded-md flex items-center justify-center font-bold text-zinc-100 text-2xl">
											{title.charAt(0) + title.charAt(1)}
										</div>

										<div>
											<div className="flex items-center gap-1">
												<Text weight="semibold">{title}</Text>
											</div>

											<Text
												size="sm"
												weight="inherit"
												className="dark:font-light text-zinc-500 dark:text-inherit"
											>
												{description}
											</Text>

											<div
												className="flex items-start gap-1 mt-2 font-medium text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors duration-300 text-xs"
												title="Check more on Github"
											>
												<FaGithub className="text-sm" />
												<button type="button" onClick={() => window.open(source, '_blank')}>
													{name}
												</button>
											</div>
										</div>
									</div>

									{/* <div></div> */}
								</LinkButton>
							))
						) : (
							<NoProjectFound />
						)}
					</Card>

					<PopularUsersCard />
				</div>
			</Container>
		</>
	);
}
