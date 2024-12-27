import { prisma } from "#/functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const UpdateTaskParamsSchema = z.object({
    id: z.string()
})
type UpdateTaskParams = z.infer<typeof UpdateTaskParamsSchema>;

export const UpdateTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["PENDING", "COMPLETED"])
})
type UpdateTaskBody = z.infer<typeof UpdateTaskBodySchema>;

async function controller(req: FastifyRequest<{ Body: UpdateTaskBody, Params: UpdateTaskParams } >, res: FastifyReply) {
    const { id } = req.params;
    const { title, description, status } = req.body;

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