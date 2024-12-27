import { prisma } from "#/functions/database.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import bcrypt from "bcrypt";

export const LoginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})
type LoginBody = z.infer<typeof LoginBodySchema>;

// Retorno: Token JWT
// Campos: E-mail, Senha
async function controller(req: FastifyRequest<{ Body: LoginBody } >, res: FastifyReply) {
    const bodyParsed = req.body;

    const findUser = await prisma.users.findUnique({
        where: {
            email: bodyParsed.email
        }
    });
    if (!findUser) throw new Error("Email ou senha incorreto.", {
        cause: "email not found"
    });

    const compareHashs = bcrypt.compareSync(bodyParsed.password, findUser.password_hash);

    if (!compareHashs) throw new Error("Email ou senha incorreto.", {
        cause: "password incorrect"
    });

    const jwtSigned = await res.jwtSign({
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        createdAt: findUser.createdAt
    }, {
        expiresIn: "1d"
    });

    if (!jwtSigned) throw new Error("Falha ao gerar token JWT.", {
        cause: "jwt error"
    });

    return res.send({ message: "Usuário logado com sucesso.", accessToken: jwtSigned });
}

export { controller as LoginController };