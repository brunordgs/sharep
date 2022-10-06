import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { FeaturedUsersCard } from '@/components/Cards/Users/FeaturedUsersCard';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import projects from '@/data/projects.json';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | sharep</title>
			</Head>

			<Container className="my-6">
				<div className="lg:grid grid-cols-6 gap-8 mt-6">
					<div className="lg:col-span-4 space-y-4">
						<DefaultHeader>Your next favorite thing</DefaultHeader>

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
