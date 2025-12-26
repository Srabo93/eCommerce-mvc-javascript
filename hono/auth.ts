import { Hono } from "hono";
import * as z from "zod";
import { createContext } from "../configurator.ts";
import { hash, verify } from "@felix/bcrypt";

const app = new Hono();
const { userApiAdapter } = createContext();
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
    ...parsed,
    password: await hash(parsed.data.password),
  };

  await userApiAdapter.registerUser(newUser);

  return c.text("user_api registered successfull", 201);
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

  // const controller = new UserApiAdapter(database);
  // const registeredUser = await controller.findUserByEmail(parsed.data.email);
  //
  // if (registeredUser === undefined) {
  //   return c.text("no user_api found", 404);
  // }
  //
  // if (!(await verify(parsed.data.password, registeredUser.password))) {
  //   return c.text("no matching passwords", 400);
  // }
  //
  // const user = UsersMapper.toPublicDTO(registeredUser);

  // return c.json({ token, ...user });
});

export default app;
