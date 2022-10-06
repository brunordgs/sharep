import { LinkButton, Props as LinkButtonProps } from '@/components/ui/Buttons/LinkButton';
import clsx from 'clsx';

export function MobileItem({ href, children, className, ...props }: LinkButtonProps) {
	return (
		<LinkButton
			href={href as string}
			color="unstyled"
			fontSize="base"
			className={clsx(
				'w-full p-5 border-b dark:border-zinc-800 last:border-0 text-center cursor-pointer hover:text-black dark:hover:text-white font-bold',
				className,
			)}
			{...props}
		>
			{children}
		</LinkButton>
	);
}
