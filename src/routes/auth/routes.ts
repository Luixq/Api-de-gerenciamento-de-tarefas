import { LoginController } from "#/controllers/auth/login.js";
import { DefineRoutes } from "functions/utils.js";

export default DefineRoutes(app => {
    app.post("/login", LoginController);
})