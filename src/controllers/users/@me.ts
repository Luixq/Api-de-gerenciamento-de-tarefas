import { FastifyReply, FastifyRequest } from "fastify";

// Requer autenticação
async function controller(req: FastifyRequest, res: FastifyReply) {
    const userData = req.user;
    
    if (!userData) throw new Error("Usuário não encontrado.", {
        cause: "user not found"
    });

    return res.send({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        createdAt: userData.createdAt,
    })
}

// {
//   id: 'cm53xivfc0000llow9f9dpv6k',
//   name: 'Luix',
//   email: 'luix@kogicodes.com.br',
//   createdAt: '2024-12-25T13:27:08.183Z',
//   iat: 1735135578,
//   exp: 1735221978
// }

export { controller as MeController };