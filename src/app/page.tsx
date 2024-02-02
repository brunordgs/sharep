// import { CreatorBanner } from '@/components/Cards/Creators/CreatorBanner';
import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { ProjectCard } from '@/components/Cards/Projects/ProjectCard';
import { ExploreMenu } from '@/components/ExploreMenu';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { prisma } from '@/lib/prisma';
import { Project } from '@/shared/interfaces/Project';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { Card } from '@ui/Card';
import { Container } from '@ui/Container';

export default async function Home() {
	// const session = useSession();

	const projects = await prisma.projects.findMany({
		select: {
			id: true,
			image: true,
			url: true,
			name: true,
			description: true,
			repo: true,
			repoUrl: true,
		},
	});

	return (
		<Container>
			<div className="lg:grid grid-cols-7 gap-8">
				<div className="md:col-span-4 lg:col-span-5 space-y-4">
					<DefaultHeader>
						Your next favorite thing
						<CaretDown className="animate-bounce" />
					</DefaultHeader>

					{/* {!session.data?.user.isCreator && isBannerOpen && (
							<CreatorBanner
								title="Become a creator"
								description="Start sharing projects on Sharep by applying to become a creator, and start posting!"
								onHandleClose={onBannerOpen}
							/>
						)} */}

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
	);
}
