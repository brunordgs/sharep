import {
	Arrow,
	Content,
	Portal,
	Provider,
	Root,
	TooltipContentProps,
	Trigger,
} from '@radix-ui/react-tooltip';
import { type ComponentPropsWithoutRef } from 'react';

function TooltipContent({ children, ...props }: TooltipContentProps) {
	return (
		<Portal>
			<Content
				className="bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 rounded py-1 px-2 shadow-xl text-xs font-medium"
				{...props}
			>
				{children}
				<Arrow className="fill-zinc-50 dark:fill-zinc-800" />
			</Content>
		</Portal>
	);
}

export function Tooltip({
	children,
	...props
}: ComponentPropsWithoutRef<'div'> & { 'data-tip': string }) {
	return (
		<>
			<Provider delayDuration={0}>
				<Root>
					<Trigger asChild>{children}</Trigger>

					<TooltipContent sideOffset={5}>{props['data-tip']}</TooltipContent>
				</Root>
			</Provider>
		</>
	);
}
