import { findTeamMembers } from './team-members.service';

export async function findTeamMembersHandler() {
	const teamMembers = await findTeamMembers();
	return teamMembers;
}
