import { Client } from "pg";
import { ForPersistingProducts } from "@application/driven_ports/for_persisting_products/ForPersistingProducts.ts";
import {
  ProductDTO,
  ProductRecord,
} from "@application/service/product/ProductDTO.ts";

export class PostgresProductRespository implements ForPersistingProducts {
  async createProduct(product: Omit<ProductDTO, "id">): Promise<void> {
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

  async saveProduct(product: ProductRecord): Promise<void> {
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

  async topProducts(limit?: number): Promise<ProductRecord[]> {
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

  async allProducts(): Promise<ProductRecord[]> {
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
