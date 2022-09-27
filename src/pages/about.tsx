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

					<div className="flex justify-center mt-10">
						<div className="flex items-center gap-4">
							<LinkButton color="unstyled" href="@brunordgs">
								<Avatar src="https://github.com/brunordgs.png" />
							</LinkButton>

							<div className="text-left">
								<Text weight="bold">Bruno Rodrigues</Text>
								<Text size="xs">I created this site.</Text>

								<LinkButton
									color="unstyled"
									fontSize="xs"
									href="@brunordgs"
									className="hover:underline"
								>
									@brunordgs
								</LinkButton>
							</div>
						</div>
					</div>
				</section>
			</Container>
		</>
	);
}
