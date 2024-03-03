import Link from 'next/link';

export function Logo() {
	return (
		<Link
			href="/"
			className="text-2xl italic font-bold lg:font-extrabold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600 rounded-md transition-all ease-out"
		>
			sharep
		</Link>
	);
}
