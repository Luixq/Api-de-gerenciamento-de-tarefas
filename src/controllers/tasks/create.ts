import { prisma } from "#functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["PENDING", "COMPLETED"]),
});
type CreateTaskBody = z.infer<typeof createTaskSchema>;

//Campos: Título, Descrição, Status (PENDING/COMPLETED)
async function controller(req: FastifyRequest<{ Body: CreateTaskBody }>, res: FastifyReply) {
    const bodyParsed = req.body;
    const userData = req.user;

    const createTask = await prisma.tasks.create({
        data: {
            title: bodyParsed.title,
            description: bodyParsed.description,
            status: bodyParsed.status,
            userId: userData.id
        }
    });
    if (!createTask) throw new Error("Erro ao criar tarefa", {
        cause: "error creating task in database"
    });

    return res.send({ message: "Tarefa criada com sucesso" });
}

export { controller as createTaskController };