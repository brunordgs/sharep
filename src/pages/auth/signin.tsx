import { FormField } from '@/components/Form/FormField';
import { Button } from '@/components/ui/Buttons/Button';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
	email: z.string().email(''),
	password: z.string(),
});

type SigninForm = z.infer<typeof schema>;

export default function Signin() {
	const {
		register,
		formState: { errors },
	} = useForm<SigninForm>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<>
			<Head>
				<title>Sign in | sharep</title>
			</Head>

			<Container className="flex justify-center md:mt-20">
				<div className="w-full max-w-md space-y-8">
					<Heading size="3xl" transform="italic">
						Sign in.
					</Heading>

					<div className="space-y-4">
						<FormField
							color="secondary"
							name="email"
							label="Email"
							placeholder="Email address..."
							register={register}
							error={errors.email?.message}
						/>

						<FormField
							color="secondary"
							name="password"
							label="Password"
							placeholder="Password..."
							register={register}
							error={errors.password?.message}
						/>
					</div>

					<div className="flex items-center justify-between">
						<LinkButton
							href="/auth/signup"
							color="unstyled"
							className="inline-flex font-medium text-base text-rose-500 hover:text-rose-600 dark:hover:text-rose-400"
						>
							Need an account? Sign up
						</LinkButton>
						<Button>Sign In</Button>
					</div>
				</div>
			</Container>
		</>
	);
}
