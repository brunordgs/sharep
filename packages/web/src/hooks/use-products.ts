import { useInfiniteQuery } from '@tanstack/react-query';

export function useProducts({ pageSize }: { pageSize: number }) {
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
		refetchOnWindowFocus: false,
	});

	return {
		products: data?.pages.flatMap((page) => page) ?? [],
		isProductsLoading: isLoading,
	};
}
