import { assertEquals, assertThrows } from "@std/assert";
import { User, UserRole } from "@application/User.ts";

Deno.test("User.create() constructs a valid for_handling_users with default role", () => {
  const user = User.create({
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
  });

  assertEquals(user.email, "john@example.com");
  assertEquals(user.firstName, "John");
  assertEquals(user.lastName, "Doe");
  assertEquals(user.role, "user");
});

Deno.test("User.create() constructs a for_handling_users with custom role", () => {
  const user = User.create({
    email: "admin@example.com",
    firstName: "Alice",
    lastName: "Admin",
    role: "admin" as UserRole,
  });

  assertEquals(user.role, "admin");
});

Deno.test("User.create() throws on invalid email", () => {
  assertThrows(
    () =>
      User.create({
        email: "invalidemail",
        firstName: "John",
        lastName: "Doe",
      }),
    Error,
    "Invalid email address",
  );
});

Deno.test("User.create() throws on short first name", () => {
  assertThrows(
    () =>
      User.create({
        email: "john@example.com",
        firstName: "J",
        lastName: "Doe",
      }),
    Error,
    "First name must be at least 2 characters",
  );
});

Deno.test("User.create() throws on short last name", () => {
  assertThrows(
    () =>
      User.create({
        email: "john@example.com",
        firstName: "John",
        lastName: "D",
      }),
    Error,
    "Last name must be at least 2 characters",
  );
});

Deno.test("User.changeEmail() updates email correctly", () => {
  const user = User.create({
    email: "old@example.com",
    firstName: "John",
    lastName: "Doe",
  });

  user.changeEmail("new@example.com");
  assertEquals(user.email, "new@example.com");
});

Deno.test("User.changeEmail() throws on invalid email", () => {
  const user = User.create({
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
  });

  assertThrows(
    () => user.changeEmail("invalid"),
    Error,
    "Invalid email address",
  );
});

Deno.test("User.promoteToAdmin() sets role to admin", () => {
  const user = User.create({
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
  });

  assertEquals(user.role, "user");
  user.promoteToAdmin();
  assertEquals(user.role, "admin");
});
