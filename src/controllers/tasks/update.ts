import { prisma } from "#/functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const paramsModel = z.object({
    id: z.string()
})

const bodyModel = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["PENDING", "COMPLETED"])
})

async function controller(req: FastifyRequest, res: FastifyReply) {
    const { id } = await paramsModel.parseAsync(req.params);
    const { title, description, status } = await bodyModel.parseAsync(req.body);

    if (!title || !description || !status) throw new Error("All fields are required", {
        cause: "Missing fields"
    });

    const task = await prisma.tasks.update({
        where: { id: id, userId: req.user.id },
        data: {
            title,
            description,
            status
        }
    });
    if (!task) throw new Error("Error updating task", {
        cause: "error updating task in database"
    });

    return res.send(task);
}

export { controller as updateTaskController };