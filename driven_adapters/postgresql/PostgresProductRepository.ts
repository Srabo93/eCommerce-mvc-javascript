import { Client } from "pg";
import { ProductRecord } from "@application/driven_ports/for_persisting_products/dto.ts";
import { ForPersistingProducts } from "@application/driven_ports/for_persisting_products/ForPersistingProducts.ts";
import { Product } from "@application/Product.ts";

export class PostgresProductRespository implements ForPersistingProducts {
  async findProduct(productId: number): Promise<ProductRecord | null> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const query = `
    SELECT * FROM products WHERE id = $1;
    `;

    try {
      await client.connect();
      const record = await client.query(query, [productId]);

      if (record.rows.length === 0) {
        return null;
      }

      return {
        productId: record.rows[0].id,
        categoryId: record.rows[0].category_id,
        title: record.rows[0].title,
        description: record.rows[0].description,
        price: record.rows[0].price,
        image: record.rows[0].image,
        rating: record.rows[0].rating,
      } satisfies ProductRecord;
    } catch (error) {
      throw error;
    } finally {
      await client.end();
    }
  }

  async createProduct(product: Product): Promise<void> {
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
      throw error;
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
      throw error;
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

    try {
      await client.connect();
      const records = await client.query(query, [limit]);
      return records.rows.map((record: any) => {
        return {
          productId: record.id,
          categoryId: record.category_id,
          title: record.title,
          description: record.description,
          price: record.price,
          image: record.image,
          rating: record.rating,
        } satisfies ProductRecord;
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await client.end();
    }
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

    try {
      await client.connect();
      const records = await client.query(query);

      return records.rows.map((record: any) => {
        return {
          productId: record.id,
          categoryId: record.category_id,
          title: record.title,
          description: record.description,
          price: record.price,
          image: record.image,
          rating: record.rating,
        } satisfies ProductRecord;
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await client.end();
    }
  }
}
