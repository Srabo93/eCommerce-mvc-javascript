import { Hono } from "hono";
import { ProductsHttpController } from "@adapters/inbound/ProductsHttpController.ts";
import { createContext } from "../configurator.ts";

const app = new Hono();

app.get("/products", async (c) => {
  const { productRepo } = createContext();
  const productController = new ProductsHttpController(productRepo);
  const products = await productController.allProducts();
  return c.json(products);
});

app.get("/products/top", async (c) => {
  const { productRepo } = createContext();
  const productController = new ProductsHttpController(productRepo);
  const topProducts = await productController.topProducts();
  return c.json(topProducts);
});

Deno.serve(app.fetch);
