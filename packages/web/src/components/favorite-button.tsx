'use client';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Props {
	slug: string;
	isFavorite: boolean;
}

export function FavoriteButton({ slug, isFavorite }: Props) {
	async function handleFavorite() {
		await fetch('/api/products/favorite', {
			method: 'PATCH',
			body: JSON.stringify({ slug }),
		});
	}

	return (
		<Button size="lg" variant={isFavorite ? 'secondary' : 'outline'} onClick={handleFavorite}>
			<Star className={cn({ 'fill-card-foreground': isFavorite }, 'size-4 mr-2')} />
			Favorite
		</Button>
	);
}
