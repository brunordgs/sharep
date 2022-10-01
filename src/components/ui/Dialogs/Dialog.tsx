import { Children } from '@/shared/interfaces/Children';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { motion } from 'framer-motion';

interface Props extends Children {
	className?: string;
	collapse: boolean;
	onCollapse(collapse: boolean): void;
}

export function Dialog({ children, collapse, onCollapse, className }: Props) {
	return (
		<HeadlessDialog
			as={motion.div}
			open={collapse}
			onClose={onCollapse}
			className={className}
			variants={{
				hidden: { opacity: 0 },
				show: {
					opacity: 1,
					transition: {
						staggerChildren: 0.1,
					},
				},
			}}
			initial="hidden"
			animate="show"
			exit="hidden"
		>
			{children}
		</HeadlessDialog>
	);
}
