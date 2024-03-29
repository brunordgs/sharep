import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;

if (typeof window === 'undefined') {
	if (process.env.NODE_ENV === 'production') {
		prisma = new PrismaClient();
	} else {
		const globalWithPrisma = global as typeof globalThis & {
			prisma: PrismaClient;
		};

		if (!globalWithPrisma.prisma) {
			globalWithPrisma.prisma = new PrismaClient();
		}

		prisma = globalWithPrisma.prisma;
	}
}
