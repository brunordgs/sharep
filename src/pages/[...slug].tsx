import { Text } from '@/components/ui/Typography/Text';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Profile() {
	return (
		<main className="max-w-5xl w-full mx-auto">
			<div className="bg-gradient-to-b from-rose-500 to-pink-600 h-48 rounded-b-2xl" />
			<div className="-mt-20 mx-4">
				<div className="flex items-end">
					<img
						src="https://github.com/brunordgs.png"
						className="w-36 rounded-full border-4 border-zinc-100"
					/>

					<div className="m-6 flex items-center gap-6">
						<div className="flex items-center gap-2">
							<FaTwitter />
							Twitter
						</div>

						<div className="flex items-center gap-2">
							<FaGithub />
							Github
						</div>
					</div>
				</div>

				<div>
					<Text weight="bold" className="text-3xl">
						Bruno Rodrigues
					</Text>
					<Text as="span">@brunordgs</Text>
				</div>
			</div>
		</main>
	);
}
