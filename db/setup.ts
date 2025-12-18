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

    await client.query(`
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS products_category;
  DROP TABLE IF EXISTS users;
`);

    await client.query(`
  CREATE TABLE products_category (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 2),
    description VARCHAR(255) NOT NULL CHECK (char_length(description) >= 2)
  );
`);
    console.log("Products Category table created/verified successfully.");

    await client.query(`
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (char_length(title) >= 2),
    description VARCHAR(255) NOT NULL CHECK (char_length(description) >= 2),
    price INT NOT NULL CHECK (price > 0),
    image VARCHAR(255) NOT NULL CHECK (char_length(image) >= 2),
    rating INT NOT NULL CHECK (rating >= 0),
    category_id INT NOT NULL,
    CONSTRAINT fk_category
      FOREIGN KEY (category_id)
      REFERENCES products_category(id)
      ON DELETE RESTRICT
  );
`);
    console.log("Products table created/verified successfully.");

    await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL CHECK (char_length(email) >= 2),
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL CHECK (char_length(first_name) >= 2),
    last_name VARCHAR(255) NOT NULL CHECK (char_length(last_name) >= 2),
    role VARCHAR(255) NOT NULL CHECK (char_length(role) >= 2)
  );
`);
    console.log("Users table created/verified successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
    console.log("Disconnected from Postgres.");
  }
}

main();
