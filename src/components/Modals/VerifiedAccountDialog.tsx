import { Dialog, Transition } from '@headlessui/react';
import { CircleWavyCheck } from 'phosphor-react';
import { Fragment, useState } from 'react';

interface Props {
	size?: number;
}

export function VerifiedAccountDialog({ size }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<button type="button" onClick={openModal}>
				<CircleWavyCheck
					weight="fill"
					size={size}
					className="text-indigo-500"
					aria-label="Verified account"
				/>
			</button>

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
								<Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-center align-middle shadow-md transition-all">
									<div className="flex justify-center">
										<CircleWavyCheck
											weight="fill"
											className="text-indigo-500"
											size={48}
											aria-label="Verified account"
										/>
									</div>

									<Dialog.Title as="h3" className="text-2xl font-bold my-2">
										Account information
									</Dialog.Title>

									<Dialog.Description className="text-zinc-500 dark:text-zinc-400 text-sm">
										This account is verified because it&apos;s a staff user, notable creator or
										another designated category.
									</Dialog.Description>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
