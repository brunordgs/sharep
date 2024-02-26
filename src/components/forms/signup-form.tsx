'use client';

import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Alert } from '@ui/Alert';
import { LoadingButton } from '@ui/Buttons/LoadingButton';
import { Container } from '@ui/Container';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from '../ui/button';
import { LinkButton } from '../ui/link-button';

const signUpSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	username: z.string().min(1, 'This field is required'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const methods = useForm<SignUpSchema>({
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(signUpSchema),
	});

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	// const createUser = useMutation((values: SignUpSchema) =>
	// 	axios.post('/users', {
	// 		email: values.email,
	// 		name: values.name,
	// 		username: values.username,
	// 		password: values.password,
	// 		image: 'https://ik.imagekit.io/sharep/icon_3uHBhmu8u.svg',
	// 	}),
	// );

	return (
		<Container className="flex justify-center md:my-20">
			<Form
				onSubmit={handleSubmit(async (values) => {
					// createUser.mutate(values);
					// await signIn('email', {
					// email: user.email,
					// password: user.password,
					// });
				})}
				className="w-full max-w-md space-y-8"
				methods={methods}
			>
				<Heading size="3xl" transform="italic">
					Sign up.
				</Heading>

				<Alert
					color="warning"
					title="Beta Preview Warning"
					description="This site is only for demonstration purposes. All data created or uploaded will be lost."
				/>

				<button
					type="button"
					className="flex items-center justify-center gap-2 w-full bg-zinc-200 hover:bg-zinc-200/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/90 p-2 rounded-md font-medium hover:text-black dark:hover:text-white text-sm transition-colors ease-out"
					onClick={() => signIn('github')}
				>
					<FaGithub size={18} /> Continue with Github
				</button>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t dark:border-zinc-800" />
					</div>

					<div className="relative flex justify-center text-sm">
						<Text as="span" size="sm" className="px-2 bg-zinc-100 dark:bg-zinc-900">
							or
						</Text>
					</div>
				</div>

				<div className="space-y-4">
					<FormField
						color="secondary"
						name="name"
						label="Name"
						placeholder="Name..."
						error={errors.name?.message}
					/>

					<FormField
						color="secondary"
						name="username"
						label="Username"
						placeholder="Username..."
						error={errors.username?.message}
					/>

					<FormField
						color="secondary"
						name="email"
						label="Email"
						placeholder="Email address..."
						error={errors.email?.message}
					/>

					<FormField
						color="secondary"
						name="password"
						label="Password"
						placeholder="Password..."
						error={errors.password?.message}
						isPassword
					/>
				</div>

				<div className="flex items-center justify-between">
					<LinkButton
						href="/auth/signin"
						variant="link"
						className="px-0"
					>
						Already have an account? Sign in
					</LinkButton>

					<Button type="submit">
						Sign Up
					</Button>
				</div>
			</Form>
		</Container>
	);
}
