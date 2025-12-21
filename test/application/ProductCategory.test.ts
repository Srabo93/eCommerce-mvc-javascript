import { assertEquals, assertThrows } from "@std/assert";
import { Product } from "@application/Product.ts";
import { ProductCategory } from "@application/ProductCategory.ts";

const productA = Product.create({
  categoryId: 2,
  title: "Laptop",
  description: "High-end laptop",
  price: 1200,
  image: "laptop.png",
  rating: 4,
});

const productB = Product.create({
  categoryId: 2,
  title: "Phone",
  description: "Smartphone",
  price: 800,
  image: "phone.png",
  rating: 5,
});

Deno.test("ProductCategory: creation and properties", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA],
  });

  assertEquals(category.title, "Electronics");
  assertEquals(category.description, "All electronic devices");
  assertEquals(category.products.length, 1);
  assertEquals(category.products[0].title, "Laptop");
});

Deno.test("ProductCategory: validation throws for short title", () => {
  assertThrows(
    () =>
      ProductCategory.create({
        title: "A",
        description: "Valid description",
        products: [productA],
      }),
    Error,
    "Category title must be at least 2 characters",
  );
});

Deno.test("ProductCategory: validation throws for empty products", () => {
  const emptyProducts: Product[] = [];
  const category = ProductCategory.create({
    title: "Valid",
    description: "Valid description",
    products: emptyProducts,
  });
  assertEquals(category.products.length, 0);
});

Deno.test("ProductCategory: addProduct adds new product", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA],
  });

  category.addProduct(productB);
  assertEquals(category.products.length, 2);
  assertEquals(category.products[1].title, "Phone");
});

Deno.test("ProductCategory: addProduct throws on duplicate", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA],
  });

  assertThrows(
    () => category.addProduct(productA),
    Error,
    "Product already exists in this category",
  );
});

Deno.test("ProductCategory: removeProduct works", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA, productB],
  });

  category.removeProduct("Laptop");
  assertEquals(category.products.length, 1);
  assertEquals(category.products[0].title, "Phone");
});

Deno.test("ProductCategory: removeProduct throws if product not found", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA],
  });

  assertThrows(
    () => category.removeProduct("NonExistent"),
    Error,
    "Product not found in this category",
  );
});

Deno.test(
  "ProductCategory: productsAbovePrice returns correct products",
  () => {
    const category = ProductCategory.create({
      title: "Electronics",
      description: "All electronic devices",
      products: [productA, productB],
    });

    const expensive = category.productsAbovePrice(1000);
    assertEquals(expensive.length, 1);
    assertEquals(expensive[0].title, "Laptop");
  },
);

Deno.test("ProductCategory: updateTitle and updateDescription work", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA],
  });

  category.updateTitle("Gadgets");
  category.updateDescription("Cool gadgets");
  assertEquals(category.title, "Gadgets");
  assertEquals(category.description, "Cool gadgets");
});

Deno.test("ProductCategory: updateTitle throws for invalid title", () => {
  const category = ProductCategory.create({
    title: "Electronics",
    description: "All electronic devices",
    products: [productA],
  });

  assertThrows(
    () => category.updateTitle("A"),
    Error,
    "Category title must be at least 2 characters",
  );
});

Deno.test(
  "ProductCategory: updateDescription throws for invalid description",
  () => {
    const category = ProductCategory.create({
      title: "Electronics",
      description: "All electronic devices",
      products: [productA],
    });

    assertThrows(
      () => category.updateDescription("B"),
      Error,
      "Category description must be at least 2 characters",
    );
  },
);
