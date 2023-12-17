import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { AccountLayout } from '@/layouts/AccountLayout';
import { prisma } from '@/lib/prisma';
import { axios } from '@/services/axios';
import { HTTP_PROTOCOL_REGEX } from '@/shared/constants';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { reloadSession } from '@/utils/session';
import { toast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ui/Buttons/Button';
import { LoadingButton } from '@ui/Buttons/LoadingButton';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Check, Link } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
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
	bio: z.string().max(160, 'Bio should be less than 160 characters').nullable(),
	website: z.string().max(200, 'Website should be less or equal than 200 characters'),
	github: z.string().max(15, 'Github should be less or equal than 15 characters'),
	twitter: z.string().max(15, 'Twitter should be less or equal than 15 characters'),
	twitch: z.string().max(15, 'Twitch should be less or equal than 15 characters'),
	youtube: z.string().max(200, 'Youtube should be less or equal than 200 characters'),
	tiktok: z.string().max(25, 'Tiktok should be less or equal than 25 characters'),
});

type ProfileForm = z.infer<typeof schema>;

interface Props {
	user: UserProfile;
}

export default function SettingsAccount({ user }: Props) {
	const client = useQueryClient();
	const methods = useForm<ProfileForm>({
		defaultValues: {
			username: user.username,
			displayName: user.name,
			bio: user.bio,
			github: user.social?.github,
			twitter: user.social?.twitter,
			twitch: user.social?.twitch,
			youtube: user.social?.youtube,
			website: user.social?.website.replace(HTTP_PROTOCOL_REGEX, ''),
			tiktok: user.social?.tiktok,
		},
		resolver: zodResolver(schema),
	});

	const {
		handleSubmit,
		getValues,
		reset,
		formState: { errors, isSubmitting, isDirty: isFormEditted, isSubmitSuccessful },
	} = methods;

	const [isFormSubmmited, setIsFormSubmitted] = useState(false);

	const isFormValid = !Object.entries(errors).length;

	const updateUser = useMutation(
		(values: ProfileForm) =>
			axios.put(`/users/${user.username}`, {
				username: values.username,
				name: values.displayName,
				bio: values.bio?.replace(HTTP_PROTOCOL_REGEX, ''),
				social: {
					website: values.website,
					github: values.github.replace(HTTP_PROTOCOL_REGEX, ''),
					twitter: values.twitter.replace(HTTP_PROTOCOL_REGEX, ''),
					twitch: values.twitch.replace(HTTP_PROTOCOL_REGEX, ''),
					youtube: values.youtube.replace(HTTP_PROTOCOL_REGEX, ''),
					tiktok: values.tiktok.replace(HTTP_PROTOCOL_REGEX, ''),
				},
			}),
		{
			onSuccess: () => {
				client.invalidateQueries('user');
			},
		},
	);

	async function handleUpdateProfile(values: ProfileForm) {
		try {
			updateUser.mutate(values);
			reloadSession();
			toast('User has been updated successfully', {
				type: 'success',
			});
		} catch (e) {
			console.error((e as AxiosError).message);
			toast('Something went wrong while trying to update user', {
				type: 'error',
			});
		}
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
			<Head>
				<title>Your account | Sharep</title>
			</Head>

			<AccountLayout>
				<header>
					<Heading as="h2" transform="italic" size="sm">
						Profile settings
					</Heading>

					<Text size="sm" className="dark:text-zinc-400">
						Change identifying details for you account
					</Text>
				</header>

				<Form onSubmit={handleSubmit(handleUpdateProfile)} methods={methods}>
					<div className="mt-8 space-y-6">
						<FormField
							name="username"
							label="Username"
							inputAddon="@"
							placeholder="Your username..."
							error={errors.username?.message}
						/>

						<FormField
							name="displayName"
							label="Display Name"
							placeholder="Your display name..."
							error={errors.displayName?.message}
						/>

						<FormField
							as="textarea"
							name="bio"
							label="Bio"
							rows={4}
							helperText="Write a few sentences about yourself."
							error={errors.bio?.message}
						/>

						<div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-y-4 gap-x-6">
							<FormField
								name="website"
								label="Website"
								inputAddon={<Link weight="bold" />}
								placeholder="example.com"
								error={errors.website?.message}
							/>

							<FormField
								name="github"
								label="Github"
								inputAddon={<FaGithub />}
								placeholder="brunordgs"
								error={errors.github?.message}
							/>

							<FormField
								name="twitter"
								label="Twitter"
								inputAddon={<FaTwitter />}
								placeholder="brunordgs"
								error={errors.twitter?.message}
							/>

							<FormField
								name="twitch"
								label="Twitch"
								inputAddon={<FaTwitch />}
								placeholder="brunordgs"
								error={errors.twitch?.message}
							/>

							<FormField
								name="youtube"
								label="YouTube"
								inputAddon={<FaYoutube />}
								placeholder="brunordgs"
								error={errors.youtube?.message}
							/>

							<FormField
								name="tiktok"
								label="TikTok"
								inputAddon={<FaTiktok />}
								placeholder="brunordgs"
								error={errors.tiktok?.message}
							/>
						</div>
					</div>

					<div className="flex justify-end mt-6">
						{isSubmitting ? (
							<LoadingButton />
						) : isFormSubmmited ? (
							<Button intent="success" className="cursor-not-allowed">
								<Check size={20} weight="bold" />
							</Button>
						) : (
							<Button type="submit" disabled={!isFormEditted}>
								{isFormValid ? 'Update profile' : 'Failed to save profile. Try again.'}
							</Button>
						)}
					</div>
				</Form>
			</AccountLayout>
		</>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	try {
		const session = await getSession(ctx);
		const username = session?.user.username;

		const user = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				name: true,
				bio: true,
				username: true,
				image: true,
				social: {
					select: {
						website: true,
						github: true,
						twitch: true,
						youtube: true,
					},
				},
			},
		});

		return {
			props: {
				user: user,
			},
		};
	} catch {
		return {
			notFound: true,
		};
	}
}
