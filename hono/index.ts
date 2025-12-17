import { Hono } from "hono";
import products from "./products.ts";

const app = new Hono();

app.route("/products", products);

Deno.serve(app.fetch);
