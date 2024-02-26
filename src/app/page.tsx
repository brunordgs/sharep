import { ExploreMenu } from '@/components/explore-menu';
import { NoDataFound } from '@/components/no-data-found';
import { Heading } from '@/components/ui/Typography/Heading';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { prisma } from '@/lib/prisma';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { Card } from '@/components/ui/card';
import { Container } from '@ui/Container';
import { ProjectCard } from '@/components/project-card';

export default async function Home() {
	const projects = await prisma.project.findMany({
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
					<div className="flex item-start lg:items-center justify-between flex-col md:flex-row gap-4">
						<Heading transform="italic" size="lg" className="flex items-end gap-2">
							Your next favorite thing
							<CaretDown className="animate-bounce" />
						</Heading>

						<Select>
							<SelectTrigger className="w-full md:w-56">
								<SelectValue placeholder="Latest" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="latest">Latest</SelectItem>
								<SelectItem value="all">All</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="border-b border-zinc-200 dark:border-zinc-800" />

					<Card className="lg:h-full">
						{projects.length > 0 ? (
							projects.map(({ url, ...rest }) => <ProjectCard key={url} url={url} {...rest} />)
						) : (
							<NoDataFound title="No content" description="There is no registered content." />
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
