import { Spinner } from '@/components/Icons/Spinner';
import { Button } from './Button';

export function LoadingButton() {
	return (
		<Button className="w-[83.0469px] h-[38px] disabled:hover:border-none" disabled>
			<Spinner className="w-5 h-5 text-zinc-200 dark:text-zinc-500 fill-zinc-400 dark:fill-zinc-800" />
		</Button>
	);
}
