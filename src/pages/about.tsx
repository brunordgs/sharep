import { IconButton } from '@/components/ui/Buttons/IconButton';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Image } from '@/components/ui/Image';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';
import { FaGithub } from 'react-icons/fa';

export default function About() {
	return (
		<>
			<Head>
				<title>About | Sharep</title>
			</Head>

			<div className="max-w-2xl mx-auto mt-12 mb-6 px-4 mobile:container">
				<section>
					<Heading size="3xl" transform="italic" className="max-w-md">
						We believe in our{' '}
						<Text
							as="span"
							size="inherit"
							className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 dark:from-pink-500 dark:to-rose-500 font-black inline-block w-[280px] h-14"
						>
							community
						</Text>
						.
					</Heading>

					<Text className="mt-6">
						Sharep was created to share great and useful products to our community.
					</Text>
				</section>

				<div className="border-b border-zinc-200 dark:border-zinc-800 mt-12" />

				<section>
					<Text size="xl" transform="italic" weight="bold" className="my-10">
						Our team
					</Text>

					<ol className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-x-5 gap-y-10">
						<li className="flex flex-col items-start gap-4">
							<LinkButton color="unstyled" href="@brunordgs" className="hover:opacity-80">
								<Image
									src="https://github.com/brunordgs.png"
									className="w-32 h-32 rounded-md overflow-hidden"
									alt="Bruno Rodrigues"
								/>
							</LinkButton>

							<div>
								<Text
									size="sm"
									weight="bold"
									className="sm:text-base text-zinc-800 dark:text-zinc-200 !leading-5 mb-1"
								>
									Bruno Rodrigues
								</Text>
								<Text size="xs">Founder, React Engineer & Designer.</Text>

								<IconButton
									href="https://github.com/brunordgs"
									icon={<FaGithub size={20} />}
									variant="unstyled"
									className="mt-3 hover:scale-105 hover:opacity-80 text-black dark:text-white"
									isAnchor
									target="_blank"
									rel="noopener noreferrer"
								/>
							</div>
						</li>
					</ol>
				</section>
			</div>
		</>
	);
}
