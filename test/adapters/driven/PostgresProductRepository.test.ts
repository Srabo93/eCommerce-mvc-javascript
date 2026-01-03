import { assert, assertEquals } from "@std/assert";
import { Client } from "pg";
import { Product } from "@application/Product.ts";
import { PostgresProductRespository } from "@driven_adapters/postgresql/PostgresProductRepository.ts";

const DB_CONFIG = {
  hostname: "localhost",
  port: 5432,
  user: "myuser",
  password: "mypassword",
  database: "honodb_test",
};
async function truncate() {
  const client = new Client(DB_CONFIG);
  await client.connect();
  await client.query("TRUNCATE TABLE products RESTART IDENTITY CASCADE;");
  await client.end();
}

async function insertTestProduct(
  overrides?: Partial<{
    title: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    category_id: number;
  }>,
) {
  const client = new Client(DB_CONFIG);
  await client.connect();

  const result = await client.query(
    `
    INSERT INTO products (title, description, price, image, rating, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      overrides?.title ?? "Test Product",
      overrides?.description ?? "Test Description",
      overrides?.price ?? 100,
      overrides?.image ?? "image.png",
      overrides?.rating ?? 3,
      overrides?.category_id ?? 1,
    ],
  );

  await client.end();
  return result.rows[0];
}

Deno.test("findProduct returns product when it exists", async () => {
  await truncate();
  const inserted = await insertTestProduct({ rating: 5 });

  const repo = new PostgresProductRespository();
  const product = await repo.findProduct(inserted.id);

  assert(product !== null);
  assertEquals(product.productId, inserted.id);
  assertEquals(product.title, inserted.title);
  assertEquals(product.rating, 5);
});

Deno.test("findProduct returns null when product does not exist", async () => {
  await truncate();
  const repo = new PostgresProductRespository();
  const product = await repo.findProduct(999999);

  assertEquals(product, null);
});

Deno.test("createProduct inserts a product", async () => {
  await truncate();
  const repo = new PostgresProductRespository();

  const product = Product.create({
    title: "Created Product",
    description: "Created Description",
    price: 50,
    image: "created.png",
    rating: 4,
    categoryId: 1,
  });

  await repo.createProduct(product);

  const found = await repo.findProduct(1);
  assert(found !== null);
  assertEquals(found.title, "Created Product");
});

Deno.test("saveProduct inserts a product record", async () => {
  await truncate();
  const repo = new PostgresProductRespository();

  await repo.saveProduct({
    productId: 0,
    categoryId: 1,
    title: "Saved Product",
    description: "Saved Description",
    price: 75,
    image: "saved.png",
    rating: 2,
  });

  const found = await repo.findProduct(1);
  assert(found !== null);
  assertEquals(found.title, "Saved Product");
});

Deno.test("topProducts returns products ordered by rating desc", async () => {
  await truncate();
  await insertTestProduct({ title: "Low", rating: 1 });
  await insertTestProduct({ title: "High", rating: 5 });
  await insertTestProduct({ title: "Mid", rating: 3 });

  const repo = new PostgresProductRespository();
  const products = await repo.topProducts(2);

  assertEquals(products.length, 2);
  assertEquals(products[0].rating, 5);
  assertEquals(products[1].rating, 3);
});

Deno.test("allProducts returns all products", async () => {
  await truncate();
  await insertTestProduct({ title: "All A" });
  await insertTestProduct({ title: "All B" });

  const repo = new PostgresProductRespository();
  const products = await repo.allProducts();

  assert(products.length >= 2);
  assert(products.some((p) => p.title === "All A"));
  assert(products.some((p) => p.title === "All B"));
});
