import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Buttons/Button';
import { IconButton } from '@/components/ui/Buttons/IconButton';
import { LoadingButton } from '@/components/ui/Buttons/LoadingButton';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { prisma } from '@/lib/prisma';
import { axios } from '@/services/axios';
import { reloadSession } from '@/utils/session';
import { toast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Check, Link, User } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaTwitch, FaYoutube } from 'react-icons/fa';
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
	twitch: z.string().max(15, 'Twitch should be less or equal than 15 characters'),
	youtube: z.string().max(200, 'Youtube should be less or equal than 200 characters'),
	website: z.string().max(200, 'Website should be less or equal than 200 characters'),
});

type ProfileForm = z.infer<typeof schema>;

interface Props {
	user: {
		name: string;
		username: string;
		bio: string;
		image: string;
		social: {
			website: string;
			github: string;
			twitch: string;
			youtube: string;
		};
	};
}

export default function SettingsAccount({ user }: Props) {
	const methods = useForm<ProfileForm>({
		defaultValues: {
			username: user.username,
			displayName: user.name,
			bio: user.bio,
			github: user.social.github,
			twitch: user.social.twitch,
			youtube: user.social.youtube,
			website: user.social.website,
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
	const [name, setName] = useState(user.name);
	const [username, setUsername] = useState(user.username);

	const isFormValid = !Object.entries(errors).length;

	async function handleUpdateProfile(values: ProfileForm) {
		try {
			const res = await axios.put(`/users/${user.username}`, {
				username: values.username,
				name: values.displayName,
				bio: values.bio,
				social: {
					website: values.website,
					github: values.github,
					twitch: values.twitch,
					youtube: values.youtube,
				},
			});

			setName(res.data.user.name);
			setUsername(res.data.user.username);

			reloadSession();

			toast('User has been updated successfully', {
				type: 'success',
			});
		} catch {
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

			<Container>
				<main className="grid grid-cols-1 lg:grid-cols-4">
					<div className="flex items-start gap-4 mb-4 lg:mb-0 mr-4">
						<Avatar src={user.image} size="sm" />

						<div className="flex-1">
							<Text weight="bold" className="truncate w-52" title={name}>
								{name}
							</Text>
							<Text size="xs">@{username}</Text>
						</div>

						<IconButton
							href={`/@${username}`}
							isAnchor
							icon={<User size={16} weight="bold" aria-label="Check profile" />}
							title="Check profile"
						/>
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

						<Form onSubmit={handleSubmit(handleUpdateProfile)} methods={methods}>
							<div className="mt-8 space-y-6">
								<FormField
									name="username"
									label="Username"
									inputAddon="sharep.vercel.app/@"
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

								<div className="grid sm:grid-cols-2 gap-4">
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
										name="twitch"
										label="Twitch"
										inputAddon={<FaTwitch />}
										placeholder="brunordgs"
										error={errors.twitch?.message}
									/>

									<FormField
										name="youtube"
										label="Youtube"
										inputAddon={<FaYoutube />}
										placeholder="brunordgs"
										error={errors.youtube?.message}
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
						</Form>
					</Card>
				</main>
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
};
