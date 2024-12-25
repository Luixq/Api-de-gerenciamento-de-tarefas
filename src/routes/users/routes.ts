import { MeController } from "#/controllers/users/@me.js";
import { RegisterController } from "#/controllers/users/register.js";
import { Middleware } from "#/services/middleware.js";
import { DefineRoutes } from "functions/utils.js";

export default DefineRoutes(app => {
    app.post("/", RegisterController);

    app.get("/@me", { preHandler: Middleware }, MeController);
})