import { Client } from "pg";
import { ForPersistingUsers } from "@application/driven_ports/for_persisting_users/ForPersistingUser.ts";
import {
  UserRecord,
  UserDTO,
} from "@driving_adapters/user_api/UserHttpMapper.ts";

export class PostgresUserRepository implements ForPersistingUsers {
  async findUserByEmail(email: string): Promise<UserRecord | undefined> {
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

    let userFound: UserRecord | undefined = undefined;

    try {
      await client.connect();
      const result = await client.query(query, [email]);

      if (result.rows.length === 0) {
        userFound === undefined;
        return;
      }
      userFound = result.rows[0];
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
    }
    return userFound;
  }
  async registerUser(newUser: Omit<UserDTO, "id">): Promise<void> {
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
    } finally {
      await client.end();
    }
    return;
  }
}
