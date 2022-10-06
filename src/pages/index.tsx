import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { FeaturedUsersCard } from '@/components/Cards/Users/FeaturedUsersCard';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import projects from '@/data/projects.json';
import Head from 'next/head';
import { CaretDown } from 'phosphor-react';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | sharep</title>
			</Head>

			<Container className="my-6">
				<div className="lg:grid grid-cols-6 gap-8 mt-6">
					<div className="lg:col-span-4 space-y-4">
						<div className="flex item-start lg:items-center justify-between flex-col lg:flex-row gap-4">
							<Heading transform="italic" size="lg" className="flex items-end gap-2">
								Your next favorite thing
								<CaretDown className="animate-bounce" />
							</Heading>

							<input
								type="text"
								className="bg-zinc-200 dark:bg-zinc-700 h-10 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm rounded-md px-4"
								placeholder="Search..."
							/>
						</div>

						<div className="border-b border-zinc-200 dark:border-zinc-800" />

						<Card className="lg:h-full" noPadding>
							{projects.length ? (
								projects.map(({ url, ...rest }) => <ProjectCard key={url} url={url} {...rest} />)
							) : (
								<NoProjectFound />
							)}
						</Card>
					</div>

					<FeaturedUsersCard />
				</div>
			</Container>
		</>
	);
}
