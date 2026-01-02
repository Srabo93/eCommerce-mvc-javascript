import { LoginUserRecord } from "@application/driven_ports/for_persisting_users/dto.ts";
import { ForPersistingUsers } from "@application/driven_ports/for_persisting_users/ForPersistingUsers.ts";
import { RegisterNewUser } from "@application/driving_ports/for_handling_users/dto.ts";
import { ForHandlingUsers } from "@application/driving_ports/for_handling_users/ForHandlingUsers.ts";
import { RegisterUserSchema } from "./UserSchema.ts";

export class UserApiAdapter implements ForHandlingUsers {
  constructor(private readonly repository: ForPersistingUsers) {}

  async registerUser(request: unknown): Promise<void> {
    const parsed = RegisterUserSchema.safeParse(request);

    if (!parsed.success) {
      throw parsed.error;
    }

    const { data } = parsed;

    const newUser = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role ?? "user",
    } satisfies RegisterNewUser;

    await this.repository.registerUser(newUser);
  }

  async findUserByEmail(email: string): Promise<LoginUserRecord | null> {
    return (await this.repository.loginUser(email)) ?? null;
  }
}
