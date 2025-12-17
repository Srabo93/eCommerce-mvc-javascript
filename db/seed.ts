import { Client } from "pg";

const client = new Client({
  hostname: "localhost",
  port: 5432,
  user: "myuser",
  password: "mypassword",
  database: "honodb",
});

async function main() {
  try {
    await client.connect();
    console.log("Connected to Postgres!");

    await client.query("BEGIN");

    /* -------------------- DROP TABLES -------------------- */

    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS products_category;
      DROP TABLE IF EXISTS users;
    `);

    /* -------------------- CREATE TABLES -------------------- */

    await client.query(`
      CREATE TABLE products_category (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 2),
        description VARCHAR(255) NOT NULL CHECK (char_length(description) >= 2)
      );
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 2),
        description VARCHAR(255) NOT NULL CHECK (char_length(description) >= 2),
        price INT NOT NULL CHECK (price > 0),
        image VARCHAR(255) NOT NULL CHECK (char_length(image) >= 2),
        rating INT NOT NULL CHECK (rating >= 0),
        category_id INT NOT NULL REFERENCES products_category(id)
      );
    `);

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL CHECK (char_length(email) >= 2),
        first_name VARCHAR(255) NOT NULL CHECK (char_length(first_name) >= 2),
        last_name VARCHAR(255) NOT NULL CHECK (char_length(last_name) >= 2),
        role VARCHAR(255) NOT NULL CHECK (char_length(role) >= 2)
      );
    `);

    /* -------------------- SEED CATEGORIES -------------------- */

    const categories = [
      { title: "Electronics", description: "Electronic devices" },
      { title: "Books", description: "Books and literature" },
      { title: "Clothing", description: "Apparel and fashion" },
      { title: "Home", description: "Home and living products" },
      { title: "Sports", description: "Sports equipment" },
    ];

    const categoryIds: number[] = [];

    for (const category of categories) {
      const result = await client.query(
        `
        INSERT INTO products_category (title, description)
        VALUES ($1, $2)
        RETURNING id;
        `,
        [category.title, category.description],
      );

      categoryIds.push(result.rows[0].id);
    }

    /* -------------------- SEED PRODUCTS -------------------- */

    const products = [
      {
        title: "Smartphone",
        description: "Latest smartphone",
        price: 999,
        image: "smartphone.jpg",
        rating: 5,
        categoryId: categoryIds[0],
      },
      {
        title: "Laptop",
        description: "High performance laptop",
        price: 1999,
        image: "laptop.jpg",
        rating: 4,
        categoryId: categoryIds[0],
      },
      {
        title: "Novel",
        description: "Best selling novel",
        price: 20,
        image: "book.jpg",
        rating: 5,
        categoryId: categoryIds[1],
      },
      {
        title: "T-Shirt",
        description: "Comfortable cotton t-shirt",
        price: 25,
        image: "tshirt.jpg",
        rating: 4,
        categoryId: categoryIds[2],
      },
      {
        title: "Basketball",
        description: "Professional basketball",
        price: 30,
        image: "basketball.jpg",
        rating: 5,
        categoryId: categoryIds[4],
      },
    ];

    for (const product of products) {
      await client.query(
        `
        INSERT INTO products
          (title, description, price, image, rating, category_id)
        VALUES ($1, $2, $3, $4, $5, $6);
        `,
        [
          product.title,
          product.description,
          product.price,
          product.image,
          product.rating,
          product.categoryId,
        ],
      );
    }

    /* -------------------- SEED USERS -------------------- */

    const users = [
      {
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      },
      {
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        role: "user",
      },
      {
        email: "user2@example.com",
        firstName: "Jane",
        lastName: "Smith",
        role: "user",
      },
    ];

    for (const user of users) {
      await client.query(
        `
        INSERT INTO users (email, first_name, last_name, role)
        VALUES ($1, $2, $3, $4);
        `,
        [user.email, user.firstName, user.lastName, user.role],
      );
    }

    await client.query("COMMIT");

    console.log("🌱 Database seeded successfully!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.end();
    console.log("Disconnected from Postgres.");
  }
}

main();
