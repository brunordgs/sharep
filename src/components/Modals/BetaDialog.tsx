import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Button } from '../ui/Buttons/Button';
import { Text } from '../ui/Typography/Text';

export function BetaDialog() {
	const [betaPreview, setBetaPreview] = useLocalStorage('beta-preview', false);
	const [isOpen, setIsOpen] = useState(!JSON.parse(betaPreview));
	const [isComponentMounted, setIsComponentMounted] = useState(false);

	useEffect(() => setIsComponentMounted(true), []);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setBetaPreview(true);
		setIsOpen(false);
	}

	// Wait for component mount to prevent hydration error
	if (!isComponentMounted) {
		return null;
	}

	return (
		<>
			<div
				className="uppercase italic font-bold text-zinc-600 dark:text-zinc-200 text-[10px] lg:text-xs flex items-end ml-2 select-none cursor-pointer"
				onClick={openModal}
			>
				<Text
					as="span"
					size="xs"
					transform="uppercase"
					className="bg-zinc-200 dark:bg-zinc-800 rounded px-2"
				>
					Beta
				</Text>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog className="relative z-30" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-150"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/20 dark:bg-black/50" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-150"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left shadow-md transition-all">
									<Dialog.Title as="h3" className="text-2xl font-bold my-2 max-w-[250px]">
										Welcome to Sharep Beta Preview
									</Dialog.Title>

									<div className="text-zinc-500 dark:text-zinc-400 text-sm space-y-2 mb-6">
										<Dialog.Description>
											This is an early version of the Sharep site which is available for
											demonstration purposes.
										</Dialog.Description>

										<Dialog.Description>
											Please feel free to use the site and provide feedback.
										</Dialog.Description>
									</div>

									<div className="flex justify-end">
										<Button onClick={closeModal}>Got it</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
