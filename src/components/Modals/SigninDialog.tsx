import { signInWithGithub } from '@/utils/supabase';
import { Dialog, Transition } from '@headlessui/react';
import { User } from 'phosphor-react';
import { Fragment, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/Buttons/Button';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Text } from '../ui/Typography/Text';

export function SigninDialog() {
	const [isOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<Button variant="outlined" onClick={openModal}>
				Sign in
			</Button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-30" onClose={closeModal}>
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
								<Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 text-center align-middle shadow-md transition-all">
									<Dialog.Title as="h3" className="text-2xl font-bold mt-2 mb-8 italic px-6 pt-6">
										Sign in to Sharep
									</Dialog.Title>

									<div className="space-y-4 px-6 pb-8">
										<LinkButton
											href="/auth/signin"
											color="unstyled"
											onClick={closeModal}
											className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 rounded-md p-2 w-full flex items-center justify-center font-semibold text-[15px] relative transition-colors"
										>
											<User size={18} weight="bold" className="absolute left-3" />

											<span>Use email</span>
										</LinkButton>

										<button
											className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 rounded-md p-2 w-full flex items-center justify-center font-semibold text-[15px] relative transition-colors"
											onClick={signInWithGithub}
										>
											<FaGithub size={18} className="absolute left-3" />

											<span>Continue with Github</span>
										</button>
									</div>

									<div className="border-t border-zinc-200 dark:border-zinc-800 h-12 flex items-center justify-center gap-1">
										<Text size="sm">Don't have an account?</Text>
										<LinkButton
											href="/auth/signup"
											color="unstyled"
											className="font-bold text-rose-500"
											onClick={closeModal}
										>
											Sign up
										</LinkButton>
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