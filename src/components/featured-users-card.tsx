import { Text } from '@/components/ui/Typography/Text';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getFallbackInitials } from '@/utils/helpers/format';
import { CircleWavyCheck } from '@phosphor-icons/react/dist/ssr';

export async function FeaturedUsersCard() {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			image: true,
			username: true,
			isVerified: true,
		},
	});

	const shuffledUsers = users
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.slice(0, 4)
		.map(({ value }) => value);

	return (
		<Card>
			<CardHeader className="pb-4">
				<CardTitle className="text-xl font-bold italic">Featured users</CardTitle>
			</CardHeader>

			<CardContent className="px-0">
				{shuffledUsers.length > 0 ? (
					shuffledUsers.map(({ username, image, isVerified, name }) => (
						<Link
							key={username}
							href={`/@${username}`}
							className="flex items-center w-full hover:bg-black/5 dark:hover:bg-white/5 py-2 px-6 transition-colors"
						>
							<div className="flex-1 flex items-center gap-2">
								<Avatar>
									<AvatarImage src={image} alt={name} />
									<AvatarFallback>{getFallbackInitials(name)}</AvatarFallback>
								</Avatar>

								<div className="leading-3">
									<div className="flex items-center gap-1 hover:underline">
										<Text
											weight="bold"
											size="sm"
											className="truncate md:max-w-[10rem] xl:max-w-[12rem] 2xl:max-w-[16rem]"
											title={name}
										>
											{name}
										</Text>

										{isVerified && (
											<CircleWavyCheck
												weight="fill"
												size={16}
												className="text-blue-500"
												aria-label="Verified account"
											/>
										)}
									</div>

									<Text
										as="span"
										size="sm"
										className="truncate max-w-[350px] inline-block text-zinc-500 dark:text-zinc-300/70"
										title={`@${username}`}
									>
										@{username}
									</Text>
								</div>
							</div>
						</Link>
					))
				) : (
					<Text size="sm" className="px-6 text-zinc-400">
						There is no recent users.
					</Text>
				)}
			</CardContent>
		</Card>
	);
}
