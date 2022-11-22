import { useAuth } from '@/hooks/useAuth';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'phosphor-react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '../Form';
import { FormField } from '../Form/FormField';
import { Button } from '../ui/Buttons/Button';
import { LoadingButton } from '../ui/Buttons/LoadingButton';

const schema = z.object({
	email: z.string().email('Please enter a valid email address').min(1, 'This field is required'),
	message: z.string().max(200, 'Message should be not higher than 200 characters'),
});

type CreatorForm = z.infer<typeof schema>;

export function BecomeCreatorDialog() {
	const auth = useAuth();

	const methods = useForm<CreatorForm>({
		defaultValues: {
			email: auth?.session?.user.email ?? '',
			message: '',
		},
		resolver: zodResolver(schema),
	});

	const {
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isDirty: isFormEditted, isSubmitting, isSubmitSuccessful },
	} = methods;

	const [isFormSubmmited, setIsFormSubmitted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const isFormValid = !Object.entries(errors).length;

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	// Reset "isFormSubmitted" value after field changes, I'm not using "isSubmitted" or "isSubmitSuccessfull"
	// provided by react-hook-form because these values doesn't reset (false in this case) after form submit
	useEffect(() => {
		if (isFormEditted) {
			setIsFormSubmitted(false);
		}
	}, [isFormEditted]);

	// Reset all field values after form submit to prevent wrong state values
	useEffect(() => {
		if (isSubmitSuccessful) {
			const values = getValues();
			reset(values);
		}
	}, [isSubmitSuccessful, getValues, reset]);

	return (
		<>
			<button
				onClick={openModal}
				className="bg-rose-400 border border-rose-400 text-rose-100 hover:text-white font-medium px-4 py-2 text-sm rounded-md shadow-md transition-colors disabled:bg-rose-400 disabled:border-transparent disabled:text-rose-300 disabled:cursor-not-allowed"
			>
				Become now
			</button>

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
						<div className="flex min-h-full items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-150"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-md transition-all p-6">
									<Dialog.Title as="h3" className="text-2xl font-bold mt-2 mb-8 italic text-center">
										Become a creator
									</Dialog.Title>

									<Form
										onSubmit={handleSubmit((values) => {
											console.log(values);
											setIsFormSubmitted(true);

											setTimeout(() => {
												reset(values);
												closeModal();
											}, 1000);
										})}
										className="space-y-4"
										methods={methods}
									>
										<FormField
											name="email"
											label="Email"
											error={errors.email?.message}
											placeholder="Email..."
											isRequired
										/>

										<FormField
											as="textarea"
											name="message"
											label="Message"
											helperText="Tell more about you and what you do."
											error={errors.message?.message}
										/>

										<div className="flex justify-end">
											{isSubmitting ? (
												<LoadingButton />
											) : isFormSubmmited ? (
												<Button color="success" className="cursor-not-allowed">
													<Check size={20} weight="bold" />
												</Button>
											) : (
												<Button type="submit" disabled={!isFormEditted}>
													{isFormValid
														? 'Send information'
														: 'Failed to send information. Try again.'}
												</Button>
											)}
										</div>
									</Form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
