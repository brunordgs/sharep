import { NoProjectFound } from '@/components/Cards/Projects/NoProjectFound';
import { Card } from '@ui/Card';
import { Container } from '@ui/Container';
import { Image } from '@ui/Image';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import { prisma } from '@/lib/prisma';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { FaGithub } from 'react-icons/fa';
import { type Project } from '../../shared/interfaces/Project';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';

// const schema = z.object({
// 	name: z.string(),
// 	description: z.string(),
// 	url: z.string(),
// });

// type ProjectForm = z.infer<typeof schema>;

interface Props {
	projects: Project[];
}

export default function Projects({ projects }: Props) {
	// const methods = useForm<ProjectForm>({
	// 	defaultValues: {
	// 		name: undefined,
	// 		description: undefined,
	// 		url: undefined,
	// 	},
	// 	resolver: zodResolver(schema),
	// });

	// const {
	// 	handleSubmit,
	// 	formState: { errors },
	// } = methods;

	return (
		<>
			<Head>
				<title>All Projects | Sharep</title>
			</Head>

			<Container>
				<Card>
					<header className="flex items-center justify-between">
						<div>
							<Heading as="h2" transform="italic" size="sm">
								Projects
							</Heading>

							<Text size="sm" className="dark:text-zinc-400">
								All your projects in one place.
							</Text>
						</div>

						<LinkButton
							href="/projects/new"
							intent="dark"
							icon={{
								icon: FaGithub,
								position: 'left',
								className: 'text-lg',
							}}
						>
							Import an existing project
						</LinkButton>
					</header>

					<div className="mt-6">
						{projects.length > 0 ? (
							projects.map(({ url, name, image, description }) => (
								<div key={url} className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-700/40 p-4 rounded-md">
									<Image
										src={image ?? '/sharep-logo-icon.svg'}
										className="w-10 h-10"
										alt={image ? name : 'Sharep'}
									/>

									<div className="flex flex-col">
										<Text weight="semibold">{name}</Text>
										<Text
											size="xs"
											weight="inherit"
											className="dark:font-light text-zinc-500 dark:text-inherit truncate max-w-[192px] sm:max-w-full"
										>
											{description}
										</Text>
									</div>
								</div>
							))
						) : (
							<NoProjectFound />
						)}
					</div>

					{/* <Form onSubmit={handleSubmit((values) => console.log(values))} methods={methods}>
						<div className="mt-8 space-y-6">
							<FormField
								name="name"
								label="Name"
								placeholder="Your project name..."
								error={errors.name?.message}
							/>

							<FormField
								as="textarea"
								name="description"
								label="Description"
								placeholder="Your project description..."
								error={errors.description?.message}
							/>

							<FormField
								name="url"
								label="Project URL"
								inputAddon="https://"
								placeholder="www.example.com"
								error={errors.url?.message}
							/>

							<FormField
							name="githubRepo"
							label="Github Repository"
							inputAddon={<FaGithub />}
							placeholder="Your github repository name..."
							error={errors.githubRepo?.message}
						/>

							<FormField
							name="url"
							label="Project URL"
							inputAddon="https://"
							placeholder="www.github.com/brunordgs/sharep"
							error={errors.githubUrl?.message}
						/>
						</div>
					</Form> */}
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
