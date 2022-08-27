import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';
import { FileSearch } from 'phosphor-react';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | sharep</title>
			</Head>

			<Container className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 my-10">
				<Card className="lg:col-span-4 row-span-2">
					<div className="flex flex-col items-center lg:justify-center h-full text-zinc-400">
						<FileSearch size={96} weight="thin" />

						<Text className="max-w-md text-center">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta unde mollitia
							consectetur expedita facilis.
						</Text>
					</div>
				</Card>

				<div className="hidden lg:block col-span-2">
					<Card className="mb-2">
						<Heading className="italic text-xl mb-4">Recent users</Heading>

						{Array.from({ length: 4 }, (_, index) => (
							<div key={index} className="flex items-center mb-4 last:mb-0">
								<div className="flex-1 flex items-center gap-2">
									<img src="https://github.com/brunordgs.png" className="w-8 h-8 rounded-full" />

									<div className="leading-3">
										<Text
											weight="bold"
											size="sm"
											className="truncate w-28 xl:w-full"
											title="TODO: Bruno Rodrigues"
										>
											Bruno Rodrigues
										</Text>

										<Text
											as="span"
											size="sm"
											className="truncate w-28 xl:w-full inline-block"
											title="TODO: @brunordgs"
										>
											@brunordgs
										</Text>
									</div>
								</div>

								<LinkButton href="/brunordgs" fontSize="xs" size="small">
									See profile
								</LinkButton>
							</div>
						))}
					</Card>

					<Footer />
				</div>
			</Container>

			<div className="lg:hidden">
				<Footer />
			</div>
		</>
	);
}
