import { assert, assertEquals, assertRejects } from "@std/assert";
import { ZodError } from "zod";
import { ProductService } from "@application/service/product/ProductService.ts";
import { InMemoryProductsDB } from "@driven_adapters/in_memory/InMemoryProductsDB.ts";
import { ProductApiAdapter } from "@driving_adapters/product_api/ProductApiAdapter.ts";

Deno.test(
  "ProductAdapter.create throws ZodError for invalid rating",
  async () => {
    const inMemoryDB = new InMemoryProductsDB();
    const productService = new ProductService(inMemoryDB);
    const controller = new ProductApiAdapter(productService);

    const error = await assertRejects(
      async () =>
        await controller.create({
          categoryId: 1,
          title: "foo",
          description: "bar",
          price: 30,
          image: "someimageurl",
          rating: "this will throw",
        }),
      ZodError,
    );

    assertEquals(error.issues.length, 1);
    assertEquals(error.issues[0].code, "invalid_type");
    assertEquals(error.issues[0].path, ["rating"]);
    assertEquals(
      error.issues[0].message,
      "Invalid input: expected number, received string",
    );
  },
);

Deno.test(
  "ProductAdapter.topProducts returns products from repository",
  async () => {
    const inMemoryDB = new InMemoryProductsDB();
    const productService = new ProductService(inMemoryDB);
    const controller = new ProductApiAdapter(productService);

    const result = await controller.topProducts();
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

Deno.test("ProductAdapter.topProducts respects limit", async () => {
  const inMemoryDB = new InMemoryProductsDB();
  const productService = new ProductService(inMemoryDB);
  const controller = new ProductApiAdapter(productService);

  const result = await controller.topProducts(1);

  assertEquals(result.length, 1);
});

Deno.test(
  "ProductAdapter.allProducts returns products from repository",
  async () => {
    const inMemoryDB = new InMemoryProductsDB();
    const productService = new ProductService(inMemoryDB);
    const controller = new ProductApiAdapter(productService);

    const result = await controller.allProducts();
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

Deno.test(
  "ProductAdapter.allProducts returns products from repository respecting limit",
  async () => {
    const inMemoryDB = new InMemoryProductsDB();
    const productService = new ProductService(inMemoryDB);
    const controller = new ProductApiAdapter(productService);

    const result = await controller.allProducts(5);
    assert(Array.isArray(result));

    assertEquals(result.length, 5);

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
