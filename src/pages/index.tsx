import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Footer } from '@/components/Footer';
import { NoProjectFound } from '@/components/Projects/NoProjectFound';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
	const [projects, setProjects] = useState([]);

	return (
		<>
			<Head>
				<title>Home | sharep</title>
			</Head>

			<Container className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 my-10">
				{projects.length ? (
					projects.map((_, index) => <div key={index}>hey</div>)
				) : (
					<NoProjectFound />
				)}

				<div className="hidden lg:block col-span-2">
					<Card className="mb-2">
						<aside>
							<Heading as="h2" transform="italic" className="text-xl mb-4">
								Popular users
							</Heading>

							{Array.from({ length: 4 }, (_, index) => (
								<div key={index} className="flex items-center mb-6 xl:mb-4 last:mb-0">
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

									<LinkButton href="/@brunordgs" fontSize="xs" size="small">
										Check profile
									</LinkButton>
								</div>
							))}
						</aside>
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
