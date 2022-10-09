import { FormField } from '@/components/Form/FormField';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Buttons/Button';
import { LoadingButton } from '@/components/ui/Buttons/LoadingButton';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { useAuth } from '@/hooks/useAuth';
import { updateUser } from '@/utils/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Check, Link } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as z from 'zod';

const schema = z.object({
	username: z
		.string()
		.min(1, 'Username is required')
		.max(15, 'Username should be less than 15 characters'),
	displayName: z
		.string()
		.min(1, 'Display Name is required')
		.max(50, 'Display Name should be less than 50 characters'),
	bio: z.string().max(160, 'Bio should be less than 160 characters'),
	github: z.string().max(15, 'Github should be less or equal than 15 characters'),
	twitter: z.string().max(15, 'Twitter should be less or equal than 15 characters'),
	instagram: z.string().max(30, 'Instagram should be less or equal than 30 characters'),
	website: z.string().max(200, 'Website should be less or equal than 200 characters'),
});

type ProfileForm = z.infer<typeof schema>;

export default function SettingsAccount() {
	const auth = useAuth();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		getValues,
		reset,
		formState: { errors, isSubmitting, isDirty: isFormEditted, isSubmitSuccessful },
	} = useForm<ProfileForm>({
		defaultValues: {
			username: auth?.user.username,
			displayName: auth?.user.name,
			bio: auth?.user.bio,
			github: auth?.user.github,
			twitter: auth?.user.twitter,
			instagram: auth?.user.instagram,
			website: auth?.user.website,
		},
		resolver: zodResolver(schema),
	});

	const [isFormSubmmited, setIsFormSubmitted] = useState(false);

	const isFormValid = !Object.entries(errors).length;

	useEffect(() => {
		// TODO: Improve no auth validation
		if (!auth?.session) {
			router.push('/');
			return;
		}
	}, [auth]);

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
			<Head>
				<title>Your account | Sharep</title>
			</Head>

			<Container>
				<main className="grid grid-cols-1 lg:grid-cols-4">
					<div className="flex items-start gap-4 mb-4 lg:mb-0">
						<Avatar src={auth?.user.image as string} size="sm" />

						<div>
							<Text weight="bold">{auth?.user.name}</Text>
							<Text size="xs">@{auth?.user.username}</Text>
						</div>
					</div>

					<Card className="col-span-3">
						<header>
							<Heading as="h2" transform="italic" size="sm">
								Profile settings
							</Heading>

							<Text size="sm" className="text-zinc-400">
								Change identifying details for you account
							</Text>
						</header>

						<form
							onSubmit={handleSubmit(async (values) => {
								try {
									await updateUser({
										name: values.displayName,
										username: values.username,
										bio: values.bio,
										github: values.github,
										twitter: values.twitter,
										instagram: values.instagram,
										website: values.website,
									});

									setIsFormSubmitted(true);
								} catch (e) {
									toast('Something went wrong while trying to update user', {
										className: '!bg-zinc-50 dark:!bg-zinc-900 !text-zinc-900 dark:!text-zinc-200',
										progressClassName: '!bg-rose-700 dark:!bg-rose-900',
									});
								}
							})}
						>
							<div className="mt-8 space-y-6">
								<FormField
									name="username"
									label="Username"
									inputAddon="sharep.vercel.app/@"
									placeholder="Your username..."
									register={register}
									error={errors.username?.message}
								/>

								<FormField
									name="displayName"
									label="Display Name"
									placeholder="Your display name..."
									register={register}
									error={errors.displayName?.message}
								/>

								<FormField
									as="textarea"
									name="bio"
									label="Bio"
									rows={4}
									helperText="Write a few sentences about yourself."
									register={register}
									error={errors.bio?.message}
								/>

								<div className="grid sm:grid-cols-2 gap-4">
									<FormField
										name="website"
										label="Website"
										inputAddon={<Link weight="bold" />}
										placeholder="Your website..."
										register={register}
										error={errors.website?.message}
									/>

									<FormField
										name="github"
										label="Github"
										inputAddon={<FaGithub />}
										placeholder="Your Github..."
										register={register}
										error={errors.github?.message}
									/>

									<FormField
										name="instagram"
										label="Instagram"
										inputAddon={<FaInstagram />}
										placeholder="Your instagram..."
										register={register}
										error={errors.instagram?.message}
									/>

									<FormField
										name="twitter"
										label="Twitter"
										inputAddon={<FaTwitter />}
										placeholder="Your Twitter..."
										register={register}
										error={errors.twitter?.message}
									/>
								</div>
							</div>

							<div className="flex justify-end mt-6">
								{isSubmitting ? (
									<LoadingButton />
								) : isFormSubmmited ? (
									<Button color="success" className="cursor-not-allowed">
										<Check size={20} weight="bold" />
									</Button>
								) : (
									<Button type="submit" disabled={!isFormEditted}>
										{isFormValid ? 'Update profile' : 'Failed to save profile. Try again.'}
									</Button>
								)}
							</div>
						</form>
					</Card>
				</main>
			</Container>
		</>
	);
}
