import { Hono } from "hono";
import { ProductsHttpController } from "@adapters/inbound/ProductsHttpController.ts";
import { createContext } from "../configurator.ts";

const app = new Hono();
const { productRepo } = createContext();

app.post("/", (c) => {
  const newProduct = {
    title: "new product",
    description: "new desc",
    price: 102,
    image: "someimage.url",
    rating: 3,
    categoryId: 4,
  };

  const productController = new ProductsHttpController(productRepo);
  productController.create(newProduct);

  return c.json({
    message: "Product created successfully",
  });
});

app.get("/", async (c) => {
  const productController = new ProductsHttpController(productRepo);
  const products = await productController.all();
  return c.json(products);
});

app.get("/top", async (c) => {
  const limitParam = c.req.query("limit");

  const limit = limitParam ? Number(limitParam) : 10;

  if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
    return c.json({ error: "limit must be a positive integer" }, 400);
  }
  const productController = new ProductsHttpController(productRepo);
  const topProducts = await productController.top(limit);
  return c.json(topProducts);
});

export default app;
