'use client';
import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@ui/Container';
import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from '../ui/button';
import { LinkButton } from '../ui/link-button';

const signUpSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	username: z
		.string()
		.min(1, 'This field is required')
		.max(15, 'Username must be at maximum 15 characters long'),
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
		formState: { errors, isDirty, isValid },
	} = methods;

	async function handleSignUp(values: SignUpSchema) {
		const { name, username, email, password } = values;

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, username, email, password }),
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Container className="flex justify-center md:my-20">
			<Form
				onSubmit={handleSubmit(handleSignUp)}
				className="w-full max-w-md space-y-8"
				methods={methods}
			>
				<Heading size="3xl" transform="italic">
					Sign up.
				</Heading>

				<button
					type="button"
					className="flex items-center justify-center gap-2 w-full bg-zinc-200 hover:bg-zinc-200/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/90 p-2 rounded-md font-medium hover:text-black dark:hover:text-white text-sm transition-colors ease-out"
					onClick={() => signIn('github')}
				>
					<FaGithub size={18} /> Continue with Github
				</button>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t" />
					</div>

					<div className="relative flex justify-center text-sm">
						<Text as="span" size="sm" className="px-2 bg-background">
							or
						</Text>
					</div>
				</div>

				<div className="space-y-6">
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
					<LinkButton href="/auth/signin" variant="link" className="px-0">
						Already have an account? Sign in
					</LinkButton>

					<Button disabled={!isDirty || !isValid}>Sign Up</Button>
				</div>
			</Form>
		</Container>
	);
}
