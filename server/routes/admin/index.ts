import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

export const adminApp = new OpenAPIHono();

const echoRoute = createRoute({
  path: "/echo",
  method: "post",
  description: "受け取った入力値をそのまま応答する",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: z.object({
            input: z.string().openapi({
              example: "Hello World!",
              description: "入力",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            result: z.string().openapi({
              example: "Hello World!",
              description: "応答",
            }),
          }),
        },
      },
    },
  },
});

adminApp.openapi(echoRoute, async (c) => {
  console.log("echoRoute");
  const body = await c.req.valid("json");
  return c.json({ result: body.input });
});
