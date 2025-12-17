import { Hono } from "hono";
import { ProductsHttpController } from "@adapters/inbound/ProductsHttpController.ts";
import { createContext } from "../configurator.ts";

const app = new Hono();
const { productRepo } = createContext();

app.post("/products", async (c) => {
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

app.get("/products", async (c) => {
  const productController = new ProductsHttpController(productRepo);
  const products = await productController.allProducts();
  return c.json(products);
});

app.get("/products/top", async (c) => {
  const productController = new ProductsHttpController(productRepo);
  const topProducts = await productController.topProducts();
  return c.json(topProducts);
});

Deno.serve(app.fetch);
