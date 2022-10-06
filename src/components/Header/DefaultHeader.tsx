import { Children } from '@/shared/interfaces/Children';
import { useRouter } from 'next/router';
import { CaretDown } from 'phosphor-react';
import { Heading } from '../ui/Typography/Heading';

export function DefaultHeader({ children }: Children) {
	const router = useRouter();

	return (
		<>
			<div className="flex item-start lg:items-center justify-between flex-col lg:flex-row gap-4">
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					{children}
					{/* Include arrow icon at home page */}
					{router.pathname === '/' && <CaretDown className="animate-bounce" />}
				</Heading>

				<div className="relative bg-zinc-200 dark:bg-zinc-800 h-10 rounded-md w-56 shadow-sm">
					<select
						className="bg-zinc-200 dark:bg-zinc-800 w-full h-10 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm rounded-md pl-4 font-medium"
						placeholder="Search..."
					>
						<option value="">Latest</option>
					</select>

					<CaretDown weight="bold" className="absolute right-4 top-3 pointer-events-none" />
				</div>
			</div>

			<div className="border-b border-zinc-200 dark:border-zinc-800" />
		</>
	);
}
