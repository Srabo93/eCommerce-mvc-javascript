import { assertEquals, assertThrows } from "@std/assert";
import { Product } from "@application/Product.ts";

Deno.test("Product.create() constructs a valid product_api", () => {
  const product = Product.create({
    categoryId: 2,
    title: "Laptop",
    description: "High-end laptop",
    price: 1200,
    image: "laptop.png",
    rating: 5,
  });

  assertEquals(product.categoryId, 2);
  assertEquals(product.title, "Laptop");
  assertEquals(product.description, "High-end laptop");
  assertEquals(product.price, 1200);
  assertEquals(product.image, "laptop.png");
  assertEquals(product.rating, 5);
});

Deno.test("Product.create() throws on invalid title", () => {
  assertThrows(
    () =>
      Product.create({
        categoryId: 2,
        title: "A",
        description: "Desc",
        price: 100,
        image: "img.png",
        rating: 5,
      }),
    Error,
    "Product title must be at least 2 characters",
  );
});

Deno.test("Product.create() throws on invalid description", () => {
  assertThrows(
    () =>
      Product.create({
        categoryId: 2,
        title: "Valid",
        description: "x",
        price: 100,
        image: "img.png",
        rating: 5,
      }),
    Error,
    "Product description must be at least 2 characters",
  );
});

Deno.test("Product.create() throws on invalid price", () => {
  assertThrows(
    () =>
      Product.create({
        categoryId: 2,
        title: "Valid",
        description: "Valid",
        price: 0,
        image: "img.png",
        rating: 5,
      }),
    Error,
    "Product price cant be undefined or smaller 0",
  );
});

Deno.test("Product.create() throws on invalid image", () => {
  assertThrows(
    () =>
      Product.create({
        categoryId: 2,
        title: "Valid",
        description: "Valid",
        price: 100,
        image: "x",
        rating: 5,
      }),
    Error,
    "Product image url must be at least 2 characters",
  );
});

Deno.test("Product.create() throws on invalid rating", () => {
  assertThrows(
    () =>
      Product.create({
        categoryId: 2,
        title: "Valid",
        description: "Valid",
        price: 100,
        image: "img.png",
        rating: -1,
      }),
    Error,
    "Product rating cant be less than 0",
  );
});

Deno.test(
  "updateTotalRating updates rating correctly when initial rating > 0",
  () => {
    const product = Product.create({
      categoryId: 2,
      title: "Laptop",
      description: "High-end laptop",
      price: 1200,
      image: "laptop.png",
      rating: 4,
    });

    product.updateTotalRating(6);
    assertEquals(product.rating, 5);
  },
);

Deno.test("updateTotalRating sets rating if initial rating is 0", () => {
  const product = Product.create({
    categoryId: 2,
    title: "Cheap pen",
    description: "A pen",
    price: 2,
    image: "pen.png",
    rating: 0,
  });

  product.updateTotalRating(5);
  assertEquals(product.rating, 5);
});

Deno.test("updateTotalRating throws if newRating <= 0", () => {
  const product = Product.create({
    categoryId: 2,
    title: "Laptop",
    description: "High-end laptop",
    price: 1200,
    image: "laptop.png",
    rating: 4,
  });

  assertThrows(
    () => product.updateTotalRating(0),
    Error,
    "New product_api rating cant be smaller or equal 0",
  );
});
