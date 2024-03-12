import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { Container } from '@/components/container';
import { FavoriteButton } from '@/components/favorite-button';
import { NoDataFound } from '@/components/no-data-found';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LinkButton } from '@/components/ui/link-button';
import { Heading } from '@/components/ui/typography/heading';
import { Text } from '@/components/ui/typography/text';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		slug: string;
	};
}

export default async function ProductsSlug({ params }: Props) {
	const session = await getServerSession(authOptions);
	const productName = params.slug.replaceAll('-', ' ');

	const product = await prisma.product.findFirst({
		where: {
			name: {
				equals: productName,
				mode: 'insensitive',
			},
		},
		include: {
			favorites: {
				where: {
					userId: session?.user.id as string,
				},
				select: {
					id: true,
				},
			},
		},
	});

	if (!product) {
		notFound();
	}

	return (
		<Container className="max-w-4xl space-y-12">
			<header>
				<div className="space-y-4">
					<Avatar className="size-16">
						<AvatarImage src={product.image ?? '/sharep-logo-icon.svg'} />
					</Avatar>

					<div>
						<Heading size="lg">{product.name}</Heading>

						<div className="flex items-center justify-between flex-wrap gap-5">
							<Text size="xl" weight="light" className="text-muted-foreground max-w-md">
								{product.description}
							</Text>

							<div className="flex items-center gap-2">
								<FavoriteButton slug={params.slug} isFavorite={!!product.favorites[0]?.id} />

								<LinkButton size="lg" href={product.url} target="_blank" rel="noreferrer">
									Visit website
								</LinkButton>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section>
				<div className="border-y py-4">
					{!session ? (
						<div className="flex items-center justify-between flex-wrap gap-2">
							<div className="flex items-center gap-4">
								<Avatar>
									<AvatarImage src="https://ik.imagekit.io/sharep/profile-user-svgrepo-com%202_zVv3Gve40.svg?updatedAt=1709600070117" />
								</Avatar>
								<Text size="sm" className="text-muted-foreground">
									What do you think?
								</Text>
							</div>
							<Button variant="outline">Login to comment</Button>
						</div>
					) : (
						<div>hey</div>
					)}
				</div>

				<NoDataFound
					title="No comment found"
					description="There aren't any comment at the moment"
				/>
			</section>
		</Container>
	);
}
