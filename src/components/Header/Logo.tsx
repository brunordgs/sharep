import Link from 'next/link';

export function Logo() {
	return (
		<div className="flex">
			<Link
				href="/"
				className="text-2xl italic font-bold lg:font-extrabold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600 transition-all ease-out"
			>
				sharep
			</Link>

			{/* NOTE: Should be removed soon, only available for demonstration purposes */}
			{/* <BetaDialog /> */}
		</div>
	);
}
