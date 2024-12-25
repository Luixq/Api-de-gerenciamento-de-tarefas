import { User } from "#/types/user.js";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Middleware(req: FastifyRequest, res: FastifyReply) {
    const verifyToken = await req.jwtVerify();

    if (!verifyToken) throw new Error("Token inválido.", {
        cause: "jwt invalid"
    });

    req.user = verifyToken as User;
}