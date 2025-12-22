import { Hono } from "hono";
import { createContext } from "../configurator.ts";
import { ZodError } from "zod";

const app = new Hono();
const { productController } = createContext();

app.post("/", async (c) => {
  try {
    await productController.create(await c.req.json());
    return c.json(
      {
        message: "Product created successfully",
      },
      201,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return c.json(
        {
          message: "Validation failed",
          issues: error.issues,
        },
        400,
      );
    }
    throw error;
  }
});

app.get("/", async (c) => {
  const limitParam = c.req.query("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
    throw new Error("Limit set is not valid");
  }
  try {
    const products = await productController.allProducts(limit);
    return c.json(products);
  } catch (error) {
    throw error;
  }
});

app.get("/top", async (c) => {
  const limitParam = c.req.query("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
    throw new Error("Limit set is not valid");
  }
  try {
    const topProducts = await productController.topProducts(limit);
    return c.json(topProducts);
  } catch (error) {
    throw error;
  }
});

export default app;
