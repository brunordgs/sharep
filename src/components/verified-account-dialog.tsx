import { CircleWavyCheck } from '@phosphor-icons/react/dist/ssr';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

export function VerifiedAccountDialog() {
	return (
		<Dialog>
			<DialogTrigger>
				<CircleWavyCheck
					weight="fill"
					size={24}
					className="text-blue-500"
					aria-label="Verified account"
				/>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="space-y-4 sm:text-center">
					<div className="flex justify-center">
						<CircleWavyCheck
							weight="fill"
							className="text-blue-500"
							size={48}
							aria-label="Verified account"
						/>
					</div>

					<DialogTitle className="text-2xl font-bold">Verified account</DialogTitle>
					<DialogDescription className="max-w-sm mx-auto">
						This account is verified because it&apos;s notable in content creation or another
						designated category.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
