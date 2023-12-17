import { Button } from '@ui/Buttons/Button';
import { Card } from '@ui/Card';
import { Container } from '@ui/Container';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import { prisma } from '@/lib/prisma';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { FaGithub } from 'react-icons/fa';

export default function ProjectsNew() {
	return (
		<>
			<Head>
				<title>New Project | Sharep</title>
			</Head>

			<Container>
				<Card>
					<header>
						<Heading as="h1" transform="italic" size="sm">
							Import an existing project from a Git repository
						</Heading>

						<Text size="sm" className="dark:text-zinc-400">
							To deploy a new Project, import an existing Git Repository.
						</Text>
					</header>

					<div className="mt-12 space-y-4">
						<Heading as="h2" transform="italic" size="sm">
							Connect to Git provider
						</Heading>

						<Button
							intent="dark"
							icon={{
								icon: FaGithub,
								position: 'left',
							}}
						>
							GitHub
						</Button>
					</div>
				</Card>
			</Container>
		</>
	);
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
	try {
		const session = await getSession({ req });

		const projects = await prisma.projects.findMany({
			where: {
				userId: session?.user.id,
			},
		});

		return {
			props: {
				projects,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
}
