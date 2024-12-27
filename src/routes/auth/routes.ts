import { LoginBodySchema, LoginController } from "#controllers/auth/login.js";
import { DefineRoutes } from "#functions/utils.js";

export default DefineRoutes(app => {
    app.post("/login", {
        schema: {
            tags: ["Auth"],
            body: LoginBodySchema
        },
    }, LoginController);
})