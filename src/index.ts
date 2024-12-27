import fastify from "fastify";

import cors from "@fastify/cors";
import autoload from "@fastify/autoload";
import path from "path";

import log from "consola";
import chalk from "chalk";

import "#/types/env.js";

import fastifyjwt from "@fastify/jwt";
import { User } from "./types/user.js";

import { hasZodFastifySchemaValidationErrors, jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: User
    }
}

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "API de gerenciamento de tarefas",
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
                Bearer: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
});

app.register(cors, { origin: "*" });
app.register(autoload, {
    dir: path.join(import.meta.dirname, "routes"),
    routeParams: true
});

app.register(fastifyjwt, {
    secret: process.env.JWT_SECRET
});

app.addHook("onRoute", ({ method, path }) => {
    if (method == "HEAD" || method == "OPTIONS") return;
    log.success(`${chalk.magenta(method)} ${chalk.green(path)}`);
});

app.setErrorHandler((err, req, reply) => {
    // log.error(err);
    if (hasZodFastifySchemaValidationErrors(err)) {
        return reply.code(400).send({
            error: 'Response Validation Error',
            message: "Request doesn't match the schema",
            statusCode: 400,
            details: {
                issues: err.validation,
                method: req.method,
                url: req.url,
            },
        })
    }

    return reply.code(500).send({ message: err.cause ? err.message : "Internal Server Error" });
});

app.listen({
    port: 8080,
    host: "0.0.0.0"
}).then(() => {
    log.success(`Server listening at ${chalk.green("http://localhost:8080")}`);
}).catch((err) => {
    log.error(err);
    process.exit(1);
})