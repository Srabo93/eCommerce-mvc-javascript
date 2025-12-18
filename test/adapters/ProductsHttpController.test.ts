import { assert, assertEquals } from "@std/assert";
import { ProductsHttpController } from "@adapters/inbound/ProductsHttpController.ts";
import { InMemoryDB } from "../interactor/InMemoryDB.ts";

Deno.test(
  "ProductsHttpController.topProducts returns products from repository",
  async () => {
    const inMemoryDB = new InMemoryDB();
    const controller = new ProductsHttpController(inMemoryDB);

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

Deno.test("ProductsHttpController.topProducts respects limit", async () => {
  const inMemoryDB = new InMemoryDB();
  const controller = new ProductsHttpController(inMemoryDB);

  const result = await controller.top(1);

  assertEquals(result.length, 1);
});

Deno.test(
  "ProductsHttpController.allProducts returns products from repository",
  async () => {
    const inMemoryDB = new InMemoryDB();
    const controller = new ProductsHttpController(inMemoryDB);

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
