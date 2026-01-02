import { Hono } from "hono";
import { createContext } from "../configurator.ts";
import { ZodError } from "zod";

const app = new Hono();
const { productApiAdapter } = createContext();

app.post("/", async (c) => {
  try {
    await productApiAdapter.createProduct(await c.req.json());
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
    return c.json(error, 500);
  }
});

app.get("/", async (c) => {
  const limitParam = c.req.query("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
    throw new Error("Limit set is not valid");
  }

  try {
    const products = await productApiAdapter.findAllProducts(limit);
    return c.json(products);
  } catch (error) {
    return c.json(error, 500);
  }
});

app.get("/:productId", async (c) => {
  const productId = c.req.param("productId");

  if (!productId) {
    return c.text("no product id sent", 400);
  }

  try {
    const product = await productApiAdapter.findProductById(Number(productId));
    return c.json(product);
  } catch (error) {
    return c.json(error, 500);
  }
});

app.get("/top", async (c) => {
  const limitParam = c.req.query("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
    throw new Error("Limit set is not valid");
  }

  try {
    const topProducts = await productApiAdapter.findTopProducts(limit);
    return c.json(topProducts);
  } catch (error) {
    return c.json(error, 500);
  }
});

export default app;
