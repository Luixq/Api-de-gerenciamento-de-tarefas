import { prisma } from "#/functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const deleteTaskParamsSchema = z.object({
    id: z.string()
})
type DeleteTaskParams = z.infer<typeof deleteTaskParamsSchema>

async function controller(req: FastifyRequest<{ Params: DeleteTaskParams } >, res: FastifyReply) {
    const { id } = req.params;

    const task = await prisma.tasks.delete({
        where: { id: id, userId: req.user.id }
    });

    return res.send(task);
}

export { controller as deleteTaskController };