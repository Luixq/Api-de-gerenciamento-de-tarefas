import { createTaskController, createTaskSchema } from "#/controllers/tasks/create.js";
import { deleteTaskController, deleteTaskParamsSchema } from "#/controllers/tasks/delete.js";
import { listTaskController, ListTaskQueryParamsSchema } from "#/controllers/tasks/list.js";
import { UpdateTaskBodySchema, updateTaskController, UpdateTaskParamsSchema } from "#/controllers/tasks/update.js";
import { Middleware, MiddlewareSchema } from "#/services/middleware.js";
import { DefineRoutes } from "functions/utils.js";

export default DefineRoutes(app => {
    app.post("/", {
        schema: {
            tags: ["Tasks"],
            body: createTaskSchema,
            headers: MiddlewareSchema,
            security: [{ Bearer: [] }]
        },
        preHandler: async (req, reply) => {
            await Middleware(req, reply);
        },
    }, createTaskController);

    app.get("/", {
        schema: {
            tags: ["Tasks"],
            querystring: ListTaskQueryParamsSchema,
            headers: MiddlewareSchema,
            security: [{ Bearer: [] }]
        },
        preHandler: async (req, reply) => {
            await Middleware(req, reply);
        }
    }, listTaskController);

    app.put("/:id", {
        schema: {
            tags: ["Tasks"],
            params: UpdateTaskParamsSchema,
            body: UpdateTaskBodySchema,
            headers: MiddlewareSchema,
            security: [{ Bearer: [] }]
        },
        preHandler: async (req, reply) => {
            await Middleware(req, reply);
        }
    }, updateTaskController);
    app.delete("/:id", {
        schema: {
            tags: ["Tasks"],
            params: deleteTaskParamsSchema,
            headers: MiddlewareSchema,
            security: [{ Bearer: [] }]
        },
        preHandler: async (req, reply) => {
            await Middleware(req, reply);
        }
    }, deleteTaskController);
})