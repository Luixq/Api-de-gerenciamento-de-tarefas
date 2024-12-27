import { MeController } from "#/controllers/users/@me.js";
import { registerBodySchema, RegisterController } from "#/controllers/users/register.js";
import { Middleware, MiddlewareSchema } from "#/services/middleware.js";
import { DefineRoutes } from "functions/utils.js";

export default DefineRoutes(app => {
    app.post("/", {
        schema: {
            tags: ["Users"],
            body: registerBodySchema
        }
    }, RegisterController);

    app.get("/@me", {
        schema: {
            tags: ["Users"],
            headers: MiddlewareSchema,
            security: [{ Bearer: [] }]
        },
        preHandler: async (req, reply) => {
            await Middleware(req, reply);
        },
    }, MeController);
})