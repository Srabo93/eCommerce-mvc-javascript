import { Hono } from "hono";
import * as z from "zod";
import { createContext } from "../configurator.ts";
import { hash, verify } from "@felix/bcrypt";
import { UsersHttpController } from "@adapters/inbound/UserController.ts";
import { UsersMapper } from "@adapters/anti-corruption-layer/UsersMapper.ts";

const app = new Hono();
const { usersController } = createContext();
const token = "read+write";

const registerSchema = z.object({
  email: z.email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(2).max(30),
});

app.post("/register", async (c) => {
  const parsed = registerSchema.safeParse(await c.req.parseBody());

  if (!parsed.success) {
    return c.text("invalid form inputs", 400);
  }

  const newUser = {
    ...parsed.data,
    password: await hash(parsed.data.password),
    role: "user" as const,
  };

  const controller = new UsersHttpController(database);
  controller.register(newUser);

  return c.text("user registered successfull", 201);
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2).max(30),
});

app.post("/login", async (c) => {
  const parsed = loginSchema.safeParse(await c.req.parseBody());

  if (!parsed.success) {
    return c.text("bad request", 400);
  }

  const controller = new UsersHttpController(database);
  const registeredUser = await controller.findUserByEmail(parsed.data.email);

  if (registeredUser === undefined) {
    return c.text("no user found", 404);
  }

  if (!(await verify(parsed.data.password, registeredUser.password))) {
    return c.text("no matching passwords", 400);
  }

  const user = UsersMapper.toPublicDTO(registeredUser);

  return c.json({ token, ...user });
});

export default app;
