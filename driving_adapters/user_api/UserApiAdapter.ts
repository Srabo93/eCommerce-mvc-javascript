import { UserRecord } from "@application/driven_ports/for_persisting_users/dto.ts";
import { ForPersistingUsers } from "@application/driven_ports/for_persisting_users/ForPersistingUsers.ts";
import { ForHandlingUsers } from "@application/driving_ports/for_handling_users/ForHandlingUsers.ts";
import { RegisterUserSchema } from "./UserSchema.ts";
import { RegisterNewUser } from "@application/driving_ports/for_handling_users/dto.ts";

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

  findUserByEmail(email: string): Promise<UserRecord> {
    throw new Error("Method not implemented.");
  }
}
