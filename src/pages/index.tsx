import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { ExploreMenu } from '@/components/ExploreMenu';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import projects from '@/data/projects.json';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Sharep</title>
			</Head>

			<Container>
				<div className="lg:grid grid-cols-7 gap-8 mt-6">
					<div className="md:col-span-4 lg:col-span-5 space-y-4">
						<DefaultHeader>Your next favorite thing</DefaultHeader>

						<Card className="lg:h-full" noPadding>
							{projects.length ? (
								projects.map(({ url, ...rest }) => <ProjectCard key={url} url={url} {...rest} />)
							) : (
								<NoProjectFound />
							)}
						</Card>
					</div>

					<div className="hidden lg:block lg:col-span-2">
						<ExploreMenu />
					</div>
				</div>
			</Container>
		</>
	);
}
