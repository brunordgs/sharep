import { FastifyInstance } from "fastify";
import { findTeamMembersHandler } from "./team-members.controller";

export async function teamMembersRoutes(server: FastifyInstance) {
	server.get('/', findTeamMembersHandler);
}