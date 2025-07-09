import { app } from "@/server";
//import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const _app = app;

const routes = _app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
}).get("/goodbye", (c) => {
  return c.json({
    message: "goodbye Next.js!",
  });
});

export type AppType = typeof routes;

export const GET = handle(_app);
export const POST = handle(_app);
