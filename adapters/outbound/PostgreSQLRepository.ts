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

  findTopProducts(limit?: number): Promise<ProductDTO[]> {}
  findAllProducts(): Promise<ProductDTO[]> {}
}
