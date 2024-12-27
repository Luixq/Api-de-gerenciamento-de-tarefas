import { FastifyReply, FastifyRequest } from "fastify";

import bcrypt from "bcrypt";
import { prisma } from "#/functions/database.js";
import { z } from "zod";

export const registerBodySchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
});
type RegisterBody = z.infer<typeof registerBodySchema>;

// Campos: Nome, E-mail, Senha
async function controller(req: FastifyRequest<{ Body: RegisterBody }>, res: FastifyReply) {
    const { email, name, password } = req.body;

    const passwordHashed = await bcrypt.hash(password, 10);

    const addUser = await prisma.users.create({
        data: {
            name: name,
            email: email,
            password_hash: passwordHashed,
        }
    });
    if (!addUser) throw new Error("Falha ao cadastrar usuário.", {
        cause: "database error"
    });

    return res.code(201).send({ message: "Usuário cadastrado com sucesso." });
}

export { controller as RegisterController };