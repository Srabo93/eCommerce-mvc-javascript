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

    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 2),
        description VARCHAR(255) NOT NULL CHECK (char_length(description) >= 2),
        price INT NOT NULL CHECK (price > 0),
        image VARCHAR(255) NOT NULL CHECK (char_length(image) >= 2),
        rating INT NOT NULL CHECK (rating >= 0)
      );
    `);

    console.log("Products table created/verified successfully.");

    const insertQuery = `
      INSERT INTO products (title, description, price, image, rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const product = {
      title: "Example Product",
      description: "A product created via Deno",
      price: 42,
      image: "https://example.com/image.png",
      rating: 5,
    };

    const result = await client.query(insertQuery, [
      product.title,
      product.description,
      product.price,
      product.image,
      product.rating,
    ]);

    console.log("Inserted product:", result.rows[0]);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
    console.log("Disconnected from Postgres.");
  }
}

main();
