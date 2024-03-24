'use client';
import { Container } from '@/components/container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { LinkButton } from '../ui/link-button';
import { PasswordInput } from '../ui/password-input';
import { Heading } from '../ui/typography/heading';
import { Text } from '../ui/typography/text';

const signInSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm() {
	const router = useRouter();

	const form = useForm<SignInSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(signInSchema),
	});

	const {
		handleSubmit,
		control,
		setError,
		formState: { errors, isDirty, isValid, isSubmitting },
	} = form;

	async function handleSignIn(values: SignInSchema) {
		const { email, password } = values;

		try {
			const res = await fetch('/api/auth/signin', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			});

			if (res?.status === 401) {
				setError('email', { message: 'Invalid email address or password' });
				return;
			}

			router.refresh();
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<Container className="max-w-lg space-y-8">
			<Heading size="3xl" transform="italic">
				Sign in.
			</Heading>

			<Button
				type="button"
				variant="secondary"
				size="sm"
				className="w-full text-center"
				// onClick={() => signIn('github')}
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
				<form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem tabIndex={0}>
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
								<div className="flex items-end justify-between pb-1">
									<FormLabel>Password</FormLabel>
									<LinkButton href="/auth/forgot-password" variant="link" className="p-0 h-auto" tabIndex={1}>
										Forgot password?
									</LinkButton>
								</div>
								<FormControl tabIndex={0}>
									<PasswordInput placeholder="Enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col gap-2 pt-6">
						<Button
							isLoading={isSubmitting}
							disabled={isSubmitting || !isDirty || !isValid || 'email' in errors}
						>
							Sign in
						</Button>
						<div className="text-center">
							<Text as="span" size="sm" className="text-muted-foreground">
								Don't have an account?
							</Text>{' '}
							<LinkButton href="/auth/signup" variant="link" className="p-0 h-auto">
								Sign up
							</LinkButton>
						</div>
					</div>
				</form>
			</Form>
		</Container>
	);
}
