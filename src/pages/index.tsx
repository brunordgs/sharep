import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { RecentUsersCard } from '@/components/Cards/Users/RecentUsersCard';
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
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					Your next favorite thing
					<CaretDown className="animate-bounce" />
				</Heading>

				<div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 mt-6">
					<Card className="lg:col-span-4 row-span-2 min-h-[112px] lg:min-h-[496px]" noPadding>
						{projects.length ? (
							projects.map(({ url, ...rest }) => <ProjectCard key={url} url={url} {...rest} />)
						) : (
							<NoProjectFound />
						)}
					</Card>

					<RecentUsersCard />
				</div>
			</Container>
		</>
	);
}
