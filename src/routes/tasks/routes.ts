import { createTaskController } from "#/controllers/tasks/create.js";
import { deleteTaskController } from "#/controllers/tasks/delete.js";
import { listTaskController } from "#/controllers/tasks/list.js";
import { updateTaskController } from "#/controllers/tasks/update.js";
import { Middleware } from "#/services/middleware.js";
import { DefineRoutes } from "functions/utils.js";

export default DefineRoutes(app => {
    app.post("/", { preHandler: Middleware }, createTaskController);

    app.get("/", { preHandler: Middleware }, listTaskController);

    app.put("/:id", { preHandler: Middleware }, updateTaskController);
    app.delete("/:id", { preHandler: Middleware }, deleteTaskController);
})