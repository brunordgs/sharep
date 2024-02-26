import Link from 'next/link';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

export function Logo() {
	return (
		<div className="flex items-center gap-1">
			<Link
				href="/"
				className="text-2xl italic font-bold lg:font-extrabold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600 rounded-md transition-all ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2"
			>
				sharep
			</Link>

			<Dialog>
				<DialogTrigger className="font-bold italic bg-border rounded px-2 py-0 block text-xs h-min mt-auto hover:text-black dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2">
					BETA
				</DialogTrigger>
				<DialogContent>
					<DialogHeader className="space-y-4">
						<DialogTitle className="text-2xl font-bold">Welcome to Sharep Beta Preview</DialogTitle>
						<DialogDescription className="space-y-2">
							<p>
								This is an early version of the Sharep website which is only available for
								demonstration purposes.
							</p>
							<p>Please feel free to use the site and provide feedback.</p>
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button>Got it</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
