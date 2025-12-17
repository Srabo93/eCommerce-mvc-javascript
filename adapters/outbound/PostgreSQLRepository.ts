import { ForPersistingProducts } from "@application/outbound/ForPersistingProducts.ts";
import { Client } from "pg";
import {
  ProductDTO,
  ProductRecord,
} from "../anti-corruption-layer/ProductsMapper.ts";

export class PostgreSQLRepository implements ForPersistingProducts {
  async create(product: Omit<ProductDTO, "id">): Promise<void> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const insertQuery = `
      INSERT INTO products (title, description, price, image, rating, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    try {
      await client.connect();
      await client.query(insertQuery, [
        product.title,
        product.description,
        product.price,
        product.image,
        product.rating,
        product.categoryId,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async save(product: ProductRecord): Promise<void> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const insertQuery = `
      INSERT INTO products (title, description, price, image, rating, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    try {
      await client.connect();
      await client.query(insertQuery, [
        product.title,
        product.description,
        product.price,
        product.image,
        product.rating,
        product.category_id,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async findTopProducts(limit?: number): Promise<ProductRecord[]> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const query = `
    SELECT
      id,
      title,
      description,
      price,
      image,
      rating,
      category_id
    FROM products
    ORDER BY rating DESC
    LIMIT $1;
  `;

    let topProducts: ProductRecord[] = [];

    try {
      await client.connect();
      const records = await client.query(query, [limit]);
      topProducts = records.rows;
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }

    return topProducts;
  }

  async findAllProducts(): Promise<ProductRecord[]> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const query = `
    SELECT * FROM products;
    `;
    let allRecords: ProductRecord[] = [];

    try {
      await client.connect();
      const records = await client.query(query);
      allRecords = records.rows;
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }

    return allRecords;
  }
}
