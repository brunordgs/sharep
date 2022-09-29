import { FormField } from '@/components/Form/FormField';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Buttons/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { useAuth } from '@/hooks/useAuth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function SettingsAccount() {
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		// TODO: Improve no auth validation
		if (!auth?.session) {
			router.push('/');
			return;
		}
	}, [auth]);

	if (!auth) return;

	return (
		<>
			<Head>
				<title>Your account | sharep</title>
			</Head>

			<Container className="my-6">
				<main className="grid grid-cols-1 lg:grid-cols-4">
					<div>
						<div className="flex items-center gap-4 mb-4 lg:mb-0">
							<Avatar src={auth.user.image} size="sm" />

							<div>
								<Text weight="bold">{auth.user.name}</Text>
								<Text size="xs">@{auth.user.username}</Text>
							</div>
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

						<div className="mt-8 space-y-6">
							<FormField
								name="username"
								label="Username"
								inputAddon="sharep.com/@"
								placeholder="Your username..."
							/>

							<FormField
								name="displayName"
								label="Display Name"
								placeholder="Your display name..."
							/>

							<FormField
								name="bio"
								as="textarea"
								label="Bio"
								rows={4}
								helperText="Write a few sentences about yourself."
							/>

							<div className="grid sm:grid-cols-2 gap-4 mt-4">
								<FormField
									name="github"
									label="Github"
									inputAddon={<FaGithub />}
									placeholder="Your Github..."
								/>

								<FormField
									name="twitter"
									label="Twitter"
									inputAddon={<FaTwitter />}
									placeholder="Your Twitter..."
								/>
							</div>
						</div>

						<div className="flex justify-end mt-6">
							<Button>Update</Button>
						</div>
					</Card>
				</main>
			</Container>
		</>
	);
}
