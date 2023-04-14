import { Social } from './Social';

export interface UserProfile {
	name: string;
	bio: string;
	username: string;
	image: string;
	social?: Social;
	isCreator: boolean;
	isVerified: boolean;
}
