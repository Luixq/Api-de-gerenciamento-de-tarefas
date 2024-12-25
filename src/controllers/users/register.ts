import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import bcrypt from "bcrypt";
import { prisma } from "#/functions/database.js";

const RegisterModel = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8),
});

// Campos: Nome, E-mail, Senha
async function controller(req: FastifyRequest, res: FastifyReply) {
    const bodyParsed = await RegisterModel.parseAsync(req.body);

    const passwordHashed = await bcrypt.hash(bodyParsed.password, 10);

    const addUser = await prisma.users.create({
        data: {
            name: bodyParsed.name,
            email: bodyParsed.email,
            password_hash: passwordHashed,
        }
    });
    if (!addUser) throw new Error("Falha ao cadastrar usuário.", {
        cause: "database error"
    });

    return res.code(201).send({ message: "Usuário cadastrado com sucesso." });
}

export { controller as RegisterController };