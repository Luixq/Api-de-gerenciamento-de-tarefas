import { prisma } from "#/functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const ListTaskQueryParamsSchema = z.object({
    status: z.enum(["PENDING", "COMPLETED"]).optional(),
    page: z.number({ coerce: true }).default(1),
    limit: z.number({ coerce: true }).default(10),
})

type ListTaskQueryParams = z.infer<typeof ListTaskQueryParamsSchema>

// Parâmetros: Filtro por status, Paginação
async function controller(req: FastifyRequest<{ Querystring: ListTaskQueryParams } >, res: FastifyReply) {
    const queryParsed = req.query;
    const userData = req.user;
    
    const whereObject: any = {
        userId: userData.id,
    }

    if (queryParsed.status) {
        whereObject.status = queryParsed.status;
    }

    const tasks = await prisma.tasks.findMany({
        where: whereObject,
        skip: queryParsed.limit * (queryParsed.page - 1),
        take: queryParsed.limit
    });
    if (!tasks) throw new Error("Erro ao buscar tarefas", {
        cause: "error fetching tasks in database"
    });

    return res.send(tasks);
}

export { controller as listTaskController };