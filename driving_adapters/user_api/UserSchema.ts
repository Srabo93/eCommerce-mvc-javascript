import * as z from "zod";
import { RegisterNewUser } from "@application/driving_ports/for_handling_users/dto.ts";

export const RegisterUserSchema = z
  .object({
    email: z.email(),
    password: z.string().min(2).max(30),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    role: z.enum(["user", "admin"]).optional().default("user"),
  })
  .strict() satisfies z.ZodType<RegisterNewUser>;

export const LoginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(2).max(30),
});
