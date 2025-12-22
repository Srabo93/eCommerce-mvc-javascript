import { assert, assertEquals, assertThrows } from "@std/assert";
import { ZodError } from "zod";
import { ProductMapper } from "@driving_adapters/product_api/ProductMapper.ts";

Deno.test("ProductMapper.toEntity return Product Insatnce correctly", () => {
  const product = ProductMapper.toEntity({
    productId: 1,
    categoryId: 2,
    title: "foo",
    description: "bar",
    price: 50,
    rating: 3,
    image: "someurl",
  });

  assert(!("productId" in product));
  assertEquals(product.categoryId, 2);
  assertEquals(product.description, "bar");
  assertEquals(product.title, "foo");
  assertEquals(product.price, 50);
  assertEquals(product.rating, 3);
  assertEquals(product.image, "someurl");
});

Deno.test("ProductMapper.toEntity throws ZodError for invalid argument", () => {
  const error = assertThrows(
    () =>
      ProductMapper.toEntity({
        productId: 1,
        categoryId: 2,
        title: "foo",
        description: "bar",
        price: "will throw",
        rating: 3,
        image: "someurl",
      } as unknown as any),
    ZodError,
  );

  assertEquals(error.issues.length, 1);
  assertEquals(error.issues[0].code, "invalid_type");
  assertEquals(error.issues[0].path, ["price"]);
  assertEquals(
    error.issues[0].message,
    "Invalid input: expected number, received string",
  );
});

//
// Deno.test(
//   "ProductAdapter.topProducts returns products from repository",
//   async () => {
//     const inMemoryDB = new InMemoryProductsDB();
//     const productService = new ProductService(inMemoryDB);
//     const controller = new ProductApiAdapter(productService);
//
//     const result = await controller.topProducts();
//     assert(Array.isArray(result));
//
//     for (const product of result) {
//       assert("title" in product);
//       assert("description" in product);
//       assert("price" in product);
//       assert("image" in product);
//       assert("rating" in product);
//
//       assertEquals(typeof product.title, "string");
//       assertEquals(typeof product.description, "string");
//       assertEquals(typeof product.price, "number");
//       assertEquals(typeof product.image, "string");
//       assertEquals(typeof product.rating, "number");
//     }
//   },
// );
//
// Deno.test("ProductAdapter.topProducts respects limit", async () => {
//   const inMemoryDB = new InMemoryProductsDB();
//   const productService = new ProductService(inMemoryDB);
//   const controller = new ProductApiAdapter(productService);
//
//   const result = await controller.topProducts(1);
//
//   assertEquals(result.length, 1);
// });
//
// Deno.test(
//   "ProductAdapter.allProducts returns products from repository",
//   async () => {
//     const inMemoryDB = new InMemoryProductsDB();
//     const productService = new ProductService(inMemoryDB);
//     const controller = new ProductApiAdapter(productService);
//
//     const result = await controller.allProducts();
//     assert(Array.isArray(result));
//
//     for (const product of result) {
//       assert("title" in product);
//       assert("description" in product);
//       assert("price" in product);
//       assert("image" in product);
//       assert("rating" in product);
//
//       assertEquals(typeof product.title, "string");
//       assertEquals(typeof product.description, "string");
//       assertEquals(typeof product.price, "number");
//       assertEquals(typeof product.image, "string");
//       assertEquals(typeof product.rating, "number");
//     }
//   },
// );
//
// Deno.test(
//   "ProductAdapter.allProducts returns products from repository respecting limit",
//   async () => {
//     const inMemoryDB = new InMemoryProductsDB();
//     const productService = new ProductService(inMemoryDB);
//     const controller = new ProductApiAdapter(productService);
//
//     const result = await controller.allProducts(5);
//     assert(Array.isArray(result));
//
//     assertEquals(result.length, 5);
//
//     for (const product of result) {
//       assert("title" in product);
//       assert("description" in product);
//       assert("price" in product);
//       assert("image" in product);
//       assert("rating" in product);
//
//       assertEquals(typeof product.title, "string");
//       assertEquals(typeof product.description, "string");
//       assertEquals(typeof product.price, "number");
//       assertEquals(typeof product.image, "string");
//       assertEquals(typeof product.rating, "number");
//     }
//   },
// );
