import { CreatorBanner } from '@/components/Cards/Creators/CreatorBanner';
import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { ExploreMenu } from '@/components/ExploreMenu';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { useBecomeCreator } from '@/hooks/useBecomeCreator';
import { prisma } from '@/lib/prisma';
import { Project } from '@/shared/interfaces/Project';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

interface Props {
	projects: Project[];
}

export default function Home({ projects }: Props) {
	const session = useSession();
	const { isBannerOpen, onBannerOpen } = useBecomeCreator();

	return (
		<>
			<Head>
				<title>Sharep</title>
			</Head>

			<Container>
				<div className="lg:grid grid-cols-7 gap-8 mt-6">
					<div className="md:col-span-4 lg:col-span-5 space-y-4">
						<DefaultHeader>Your next favorite thing</DefaultHeader>

						{!session.data?.user.isCreator && isBannerOpen && (
							<CreatorBanner
								title="Become a creator"
								description="Start sharing products on Sharep by applying to become a creator, and start posting!"
								onHandleClose={onBannerOpen}
							/>
						)}

						<Card className="lg:h-full" noPadding>
							{projects.length > 0 ? (
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

export async function getServerSideProps() {
	const projects = await prisma.projects.findMany({
		select: {
			id: true,
			url: true,
			name: true,
			title: true,
			description: true,
			source: true,
		},
	});

	return {
		props: {
			projects,
		},
	};
}
