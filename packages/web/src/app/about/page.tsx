import { Container } from '@/components/container';
import { LinkButton } from '@/components/ui/link-button';
import { Image } from '@/components/ui/image';
import { Heading } from '@/components/ui/typography/heading';
import { Text } from '@/components/ui/typography/text';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { fetchAPI } from '@/utils/fetch';

export const metadata: Metadata = {
	title: 'About',
	description: 'Work with us to share the best content',
};

export default async function About() {
	const teamMembers = await fetchAPI('team-members');

	return (
		<Container className="max-w-3xl">
			<section>
				<Heading size="3xl" transform="italic" className="max-w-md">
					We believe in our{' '}
					<Text
						as="span"
						size="inherit"
						weight="black"
						className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 dark:from-pink-500 dark:to-rose-500 inline-block w-[280px] h-14"
					>
						community
					</Text>
				</Heading>

				<Text className="mt-6">
					Sharep was created to share great and useful content to our community.
				</Text>
			</section>

			<div className="border-b border-zinc-200 dark:border-zinc-800 mt-12" />

			<section>
				<Text size="xl" transform="italic" weight="bold" className="my-10">
					Our team
				</Text>

				<ol className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-x-7 gap-y-12">
					{teamMembers.map(({ id, role, socials, user: { name, username, image } }) => (
						<li key={id} className="flex flex-col">
							<Link href={`@${username}`} className="group">
								<Image
									src={image}
									className="size-32 group-hover:opacity-80 dark:group-hover:opacity-60 duration-500 transition-opacity rounded-md overflow-hidden"
									alt={name}
								/>

								<Text
									size="sm"
									weight="bold"
									className="sm:text-base text-zinc-800 dark:text-zinc-200 mt-3"
								>
									{name}
								</Text>
								<Text size="xs" className="mb-5 leading-5 max-w-[140px]">
									{role}
								</Text>
							</Link>

							<div className="flex items-center gap-2">
								{socials?.x && (
									<Link
										href={socials.x}
										className="inline-block hover:scale-105 hover:opacity-80 duration-300 transition mt-auto"
										target="_blank"
										rel="noreferrer"
									>
										<FaXTwitter size={22} />
									</Link>
								)}

								{socials?.github && (
									<Link
										href={socials.github}
										className="inline-block hover:scale-105 hover:opacity-80 duration-300 transition mt-auto"
										target="_blank"
										rel="noreferrer"
									>
										<FaGithub size={22} />
									</Link>
								)}
							</div>
						</li>
					))}
				</ol>

				<p className="text-muted-foreground text-xs mt-8">
					...and all the awesome{' '}
					<LinkButton
						href="https://github.com/brunordgs/sharep/graphs/contributors"
						variant="link"
						className="p-0 text-xs"
						target="_blank"
						rel="noreferrer"
					>
						open source contributors
					</LinkButton>{' '}
					on GitHub.
				</p>
			</section>
		</Container>
	);
}
