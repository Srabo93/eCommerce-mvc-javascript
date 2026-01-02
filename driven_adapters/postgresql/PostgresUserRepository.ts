import { Client } from "pg";
import { LoginUserRecord } from "@application/driven_ports/for_persisting_users/dto.ts";
import { ForPersistingUsers } from "@application/driven_ports/for_persisting_users/ForPersistingUsers.ts";
import { RegisterNewUser } from "@application/driving_ports/for_handling_users/dto.ts";

export class PostgresUserRepository implements ForPersistingUsers {
  async loginUser(email: string): Promise<LoginUserRecord | null> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const query = `
    SELECT * FROM users WHERE email = $1;
    `;

    let userFound: LoginUserRecord | null = null;

    try {
      await client.connect();
      const result = await client.query(query, [email]);

      if (result.rows.length === 0) {
        userFound === undefined;
        return null;
      }
      userFound = {
        userId: result.rows[0].id,
        password: result.rows[0].password,
        email: result.rows[0].email,
        firstName: result.rows[0].first_name,
        lastName: result.rows[0].last_name,
        role: result.rows[0].role,
      } satisfies LoginUserRecord;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await client.end();
    }

    return userFound;
  }

  async registerUser(newUser: RegisterNewUser): Promise<void> {
    const client = new Client({
      hostname: "localhost",
      port: 5432,
      user: "myuser",
      password: "mypassword",
      database: "honodb",
    });

    const insertQuery = `
    INSERT INTO users (email, password, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    try {
      await client.connect();
      await client.query(insertQuery, [
        newUser.email,
        newUser.password,
        newUser.firstName,
        newUser.lastName,
        newUser.role,
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await client.end();
    }
    return;
  }
}
