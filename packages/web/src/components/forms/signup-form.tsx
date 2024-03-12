'use client';
import { Container } from '@/components/container';
import { Heading } from '@/components/ui/typography/heading';
import { Text } from '@/components/ui/typography/text';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { LinkButton } from '../ui/link-button';
import { PasswordInput } from '../ui/password-input';

const signUpSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const router = useRouter();

	const form = useForm<SignUpSchema>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(signUpSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isDirty, isValid, isSubmitting },
	} = form;

	async function handleSignUp(values: SignUpSchema) {
		const { name, email, password } = values;

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			});

			if (res.ok) {
				router.push('/auth/signup/confirm');
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Container className="max-w-lg gap-2 space-y-8">
			<Heading size="3xl" transform="italic">
				Sign up.
			</Heading>

			<Button
				type="button"
				variant="secondary"
				size="sm"
				className="w-full text-center"
				onClick={() => signIn('github')}
				leftIcon={FaGithub}
			>
				Continue with Github
			</Button>

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

			<Form {...form}>
				<form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
					<FormField
						control={control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="Enter your email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput placeholder="Enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col pt-6">
						<Button isLoading={isSubmitting} disabled={isSubmitting || !isDirty || !isValid}>
							Sign up
						</Button>

						<div className="text-center">
							<Text as="span" size="sm" className="text-muted-foreground">
								Already have an account?
							</Text>{' '}
							<LinkButton href="/auth/signin" variant="link" className="px-0">
								Sign in
							</LinkButton>
						</div>
					</div>
				</form>
			</Form>
		</Container>
	);
}
