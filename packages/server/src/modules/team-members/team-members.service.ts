import { prisma } from '../../db/client';

export async function findTeamMembers() {
	return prisma.teamMember.findMany({
		include: {
			user: {
				select: {
					name: true,
					username: true,
					image: true,
				},
			},
		},
	});
}
