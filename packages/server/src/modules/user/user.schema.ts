import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	email: z.string().email('Email is required'),
};

const createUserSchema = z.object({
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	...userCore,
});

const createUserResponseSchema = z.object({
	id: z.string(),
	username: z.string(),
	...userCore,
});

export const loginSchema = z.object({
	email: userCore.email,
	password: z.string(),
});

const loginResponseSchema = z.object({
	accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
	createUserSchema,
	createUserResponseSchema,
	loginSchema,
	loginResponseSchema,
});
