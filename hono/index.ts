import { Hono } from "hono";
import { logger } from "hono/logger";
import products from "./products.ts";
import auth from "./auth.ts";

const app = new Hono();

app.use(logger());
app.route("/products", products);
app.route("/auth", auth);

Deno.serve(app.fetch);
