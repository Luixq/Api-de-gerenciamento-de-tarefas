import { prisma } from "#/functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const paramsModel = z.object({
    id: z.string()
})

async function controller(req: FastifyRequest, res: FastifyReply) {
    const { id } = await paramsModel.parseAsync(req.params);

    const task = await prisma.tasks.delete({
        where: { id: id, userId: req.user.id }
    });

    return res.send(task);
}

export { controller as deleteTaskController };