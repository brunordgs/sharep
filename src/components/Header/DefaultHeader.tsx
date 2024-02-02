import { type Children } from '@/shared/interfaces/Children';
import { Heading } from '@ui/Typography/Heading';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

export function DefaultHeader({ children }: Children) {
	return (
		<>
			<div className="flex item-start lg:items-center justify-between flex-col md:flex-row gap-4">
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					{children}
				</Heading>

				<div className="flex items-center gap-2">
					<div className="relative bg-zinc-200 dark:bg-zinc-800 h-10 rounded-md w-full md:w-48 2xl:w-56 shadow-sm">
						<select className="bg-zinc-200 dark:bg-zinc-800 w-full h-10 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm rounded-md pl-4 font-medium">
							<option value="">Latest</option>
						</select>

						<CaretDown weight="bold" className="absolute right-4 top-3 pointer-events-none" />
					</div>
				</div>
			</div>

			<div className="border-b border-zinc-200 dark:border-zinc-800" />
		</>
	);
}
