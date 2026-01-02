import { Hono } from "hono";
import * as z from "zod";
import { createContext } from "../configurator.ts";
import { hash, verify } from "@felix/bcrypt";
import { UserDTO } from "@application/driving_ports/for_handling_users/dto.ts";

const app = new Hono();
const { userApiAdapter } = createContext();
const token = "read+write";

const registerSchema = z.object({
  email: z.email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(2),
});

app.post("/register", async (c) => {
  const requestBody = await c.req.json();

  const parsed = registerSchema.safeParse({
    email: requestBody.email,
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    password: requestBody.password,
  });

  if (!parsed.success) {
    return c.text("invalid form inputs", 400);
  }

  const newUser = {
    ...parsed.data,
    password: await hash(parsed.data.password),
  };

  try {
    await userApiAdapter.registerUser(newUser);
  } catch (error) {
    return c.text("user_api failed" + error, 400);
  }

  return c.text("user_api registered successfull", 201);
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2),
});

app.post("/login", async (c) => {
  const parsed = loginSchema.safeParse(await c.req.json());

  if (!parsed.success) {
    return c.text("bad request", 400);
  }

  const retrievedUser = await userApiAdapter.findUserByEmail(parsed.data.email);

  if (retrievedUser === null) {
    return c.text("no user_api found", 404);
  }

  if (!(await verify(parsed.data.password, retrievedUser.password))) {
    return c.text("no matching passwords", 400);
  }

  const user = {
    userId: retrievedUser.userId,
    email: retrievedUser.email,
    firstName: retrievedUser.firstName,
    lastName: retrievedUser.lastName,
    role: retrievedUser.role,
  } satisfies UserDTO;

  return c.json({ token, ...user });
});

export default app;
