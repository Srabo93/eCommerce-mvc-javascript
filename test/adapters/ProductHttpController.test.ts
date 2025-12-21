import { assert, assertEquals } from "@std/assert";
import { ProductsHttpController } from "@adapters/inbound/ProductController.ts";
import { InMemoryDB } from "../interactor/InMemoryDB.ts";
import { ProductService } from "@application/service/product.ts";

Deno.test(
  "ProductController.topProducts returns products from repository",
  async () => {
    const inMemoryDB = new InMemoryDB();
    const productService = new ProductService(inMemoryDB);
    const controller = new ProductsHttpController(productService);

    const result = await controller.top();
    assert(Array.isArray(result));

    for (const product of result) {
      assert("title" in product);
      assert("description" in product);
      assert("price" in product);
      assert("image" in product);
      assert("rating" in product);

      assertEquals(typeof product.title, "string");
      assertEquals(typeof product.description, "string");
      assertEquals(typeof product.price, "number");
      assertEquals(typeof product.image, "string");
      assertEquals(typeof product.rating, "number");
    }
  },
);

Deno.test("ProductController.topProducts respects limit", async () => {
  const inMemoryDB = new InMemoryDB();
  const productService = new ProductService(inMemoryDB);
  const controller = new ProductsHttpController(productService);

  const result = await controller.top(1);

  assertEquals(result.length, 1);
});

Deno.test(
  "ProductController.allProducts returns products from repository",
  async () => {
    const inMemoryDB = new InMemoryDB();
    const productService = new ProductService(inMemoryDB);
    const controller = new ProductsHttpController(productService);

    const result = await controller.all();
    assert(Array.isArray(result));

    for (const product of result) {
      assert("title" in product);
      assert("description" in product);
      assert("price" in product);
      assert("image" in product);
      assert("rating" in product);

      assertEquals(typeof product.title, "string");
      assertEquals(typeof product.description, "string");
      assertEquals(typeof product.price, "number");
      assertEquals(typeof product.image, "string");
      assertEquals(typeof product.rating, "number");
    }
  },
);
