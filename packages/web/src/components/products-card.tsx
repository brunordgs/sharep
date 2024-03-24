'use client';
import { Text } from '@/components/ui/typography/text';
import Link from 'next/link';
import { NoDataFound } from './no-data-found';
import { Avatar, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { useInfiniteQuery } from '@tanstack/react-query';

export function ProductsCard() {
	const { data, isLoading } = useInfiniteQuery({
		queryKey: ['list-products'],
		queryFn: async ({ pageParam = 1 }) => {
			const res = await fetch('/api/products');
			return await res.json();
		},
		initialPageParam: 1,
		getNextPageParam: (_, pages) => {
			return pages.length + 1;
		},
		retry: 0,
		refetchOnWindowFocus: false,
	});

	const products = data?.pages.flatMap((page) => page) ?? [];
	

	return (
		<Card>
			{isLoading && (
				<div>
					{Array.from({ length: 10 }, (_, index) => (
						<div
							key={index}
							className="flex items-center space-x-4 px-6 h-20 first:border-t-0 border-t"
						>
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</div>
					))}
				</div>
			)}

			{products.length
				? products.map(({ image, name, description }) => (
						<Link
							href={`/products/${decodeURI(name.toLowerCase().replace(' ', '-'))}`}
							className="border-t first:border-0 px-6 flex justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full h-20 transition-colors ease-out first:rounded-t-md"
						>
							<div className="flex items-center gap-4">
								<Avatar className="w-12 h-12">
									<AvatarImage src={image!} alt={name} />
								</Avatar>

								<div>
									<div className="flex items-center gap-1">
										<Text weight="semibold">{name}</Text>
									</div>

									<Text
										size="sm"
										className="text-muted-foreground truncate max-w-[192px] sm:max-w-full"
									>
										{description}
									</Text>
								</div>
							</div>
						</Link>
					))
				: !products.length &&
					!isLoading && (
						<NoDataFound
							title="No product found"
							description="There aren't any products at the moment"
						/>
					)}
		</Card>
	);
}
