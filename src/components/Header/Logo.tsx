import { BetaDialog } from '../Modals/BetaDialog';
import { LinkButton } from '../ui/Buttons/LinkButton';

export function Logo() {
	return (
		<div className="flex">
			<LinkButton
				href="/"
				color="unstyled"
				className="text-2xl italic font-bold lg:font-extrabold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600"
			>
				sharep
			</LinkButton>

			{/* NOTE: Should be removed soon, only available for demonstration purposes */}
			<BetaDialog />
		</div>
	);
}
