import { Hono } from "hono";
import { createContext } from "../configurator.ts";
import { CreateProductSchema } from "@adapters/anti-corruption-layer/ProductsMapper.ts";
import { ZodError } from "zod";

const app = new Hono();
const { productController } = createContext();

app.post("/", async (c) => {
  try {
    const body = await c.req.json();

    const dto = CreateProductSchema.parse(body);

    await productController.create(dto);

    return c.json({
      message: "Product created successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return c.text(error.message, 400);
    }
    return c.json({ error }, 400);
  }
});

app.get("/", async (c) => {
  const products = await productController.all();
  return c.json(products);
});

app.get("/top", async (c) => {
  const limitParam = c.req.query("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
    return c.json({ error: "limit must be a positive integer" }, 400);
  }
  const topProducts = await productController.top(limit);
  return c.json(topProducts);
});

export default app;
