import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { webApp } from "./routes/web/index.ts";
import { adminApp } from "./routes/admin/index.ts";

export const app = new OpenAPIHono().basePath("/api");

app.route("/web", webApp);

if (process.env.APP_MODE == "ADMIN") {
  app.route("/admin", adminApp);
}

app
  .doc("/api/specification", {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
    },
  })
  .get(
    "/swagger",
    swaggerUI({
      url: "api/specification",
    })
  );

app.get("/hello2", (c) => {
  return c.json({
    message: "Hello Next.js2!",
  });
});
