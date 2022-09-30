import { Avatar } from '@/components/ui/Avatar';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';

export default function About() {
	return (
		<>
			<Head>
				<title>About | sharep</title>
			</Head>

			<Container className="my-6 text-center">
				<section className="flex flex-col items-center">
					<Heading size="lg" transform="italic" className="md:text-4xl">
						About Sharep
					</Heading>

					<Heading as="h2" size="base" weight="bold" className="md:text-xl mt-2">
						Every day, great things are being made!
					</Heading>

					<Text className="mt-6">
						Sharep was created to share great and useful projects to our community.
					</Text>
				</section>

				<div className="border-b border-zinc-200 dark:border-zinc-800 my-12" />

				<section>
					<Text transform="italic" weight="bold">
						Our team
					</Text>

					<ol className="flex flex-col md:flex-row items-center justify-center mt-10 gap-y-8 gap-x-32">
						<li className="flex items-center gap-4 w-56 md:w-auto">
							<LinkButton color="unstyled" href="@brunordgs">
								<Avatar
									src="https://github.com/brunordgs.png"
									size="base"
									className="md:w-16 md:h-16"
									alt="Bruno Rodrigues"
								/>
							</LinkButton>

							<div className="text-left flex-1">
								<Text size="sm" weight="bold" className="sm:text-base">
									Bruno Rodrigues
								</Text>
								<Text size="xs">I created this site.</Text>

								<LinkButton
									color="unstyled"
									fontSize="xs"
									href="@brunordgs"
									className="hover:underline hidden sm:block mt-1"
								>
									@brunordgs
								</LinkButton>
							</div>
						</li>

						<li className="flex items-center gap-4 w-56 md:w-auto">
							<LinkButton color="unstyled" href="@costayasmin">
								<Avatar
									src="https://github.com/costayasmin.png"
									size="base"
									className="md:w-16 md:h-16"
									alt="Yasmin Costa"
								/>
							</LinkButton>

							<div className="text-left flex-1">
								<Text size="sm" weight="bold" className="sm:text-base">
									Yasmin Costa
								</Text>
								<Text size="xs">Product Designer</Text>

								<LinkButton
									color="unstyled"
									fontSize="xs"
									href="@costayasmin"
									className="hover:underline hidden sm:block mt-1"
								>
									@costayasmin
								</LinkButton>
							</div>
						</li>
					</ol>
				</section>
			</Container>
		</>
	);
}
