import { Container } from '@/components/ui/Container';
import { Image } from '@ui/Image';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'About',
	description: 'Work with us to share the best content',
};

export default function About() {
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
					<li className="space-y-4">
						<Link href="@brunordgs" className="group">
							<Image
								src="https://github.com/brunordgs.png"
								className="w-32 h-32 group-hover:opacity-80 dark:group-hover:opacity-60 duration-500 transition-opacity rounded-md overflow-hidden"
								alt="Bruno Rodrigues"
							/>

							<Text
								size="sm"
								weight="bold"
								className="sm:text-base text-zinc-800 dark:text-zinc-200 mb-1 mt-3"
							>
								Bruno Rodrigues
							</Text>
							<Text size="xs">Founder, React Engineer & Designer.</Text>
						</Link>

						<Link
							href="https://github.com/brunordgs"
							className="inline-block hover:scale-105 hover:opacity-80 duration-300 transition"
							target="_blank"
							rel="noreferrer"
						>
							<FaGithub size={22} />
						</Link>
					</li>
				</ol>
			</section>
		</Container>
	);
}
