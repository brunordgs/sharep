import { axios } from '@/services/axios';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
import { Dialog, Transition } from '@headlessui/react';
import { Avatar } from '@ui/Avatar';
import { Button } from '@ui/Buttons/Button';
import { Text } from '@ui/Typography/Text';
import { CircleWavyCheck } from 'phosphor-react';
import { Fragment, useState } from 'react';

interface Props {
	users: ShortUser[];
}

export function NewCreatorDialog({ users }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<Button onClick={openModal}>Add creator</Button>

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
									<Dialog.Title as="h3" className="text-2xl font-bold mt-2 max-w-[250px]">
										Add a new creator
									</Dialog.Title>
									<Dialog.Description className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
										You can add a new creator here.
									</Dialog.Description>

									<ul className="space-y-4">
										{users.map((user) => (
											<li key={user.username} className="flex items-center gap-2">
												<div className="flex items-center gap-4 flex-1">
													<Avatar src={user.image} size="xs" alt={user.name} />

													<div>
														<div className="flex items-center gap-1">
															<Text size="sm" weight="bold">
																{user.name}
															</Text>
															{user.isVerified && (
																<CircleWavyCheck
																	weight="fill"
																	className="text-indigo-500"
																	aria-label="Verified account"
																/>
															)}
														</div>

														<Text size="xs">@{user.username}</Text>
													</div>
												</div>

												<div className="flex gap-2">
													<Button
														fontSize="xs"
														size="small"
														onClick={async () => await axios.post('/creators', user)}
													>
														Add
													</Button>
												</div>
											</li>
										))}
									</ul>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
