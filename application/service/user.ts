import { ForHandlingUsers } from "../inbound/user/ForHandlingUsers.ts";
import { ForPersistingUsers } from "../outbound/ForPersistingUser.ts";

export class UserService implements ForHandlingUsers {
  constructor(private readonly repository: ForPersistingUsers) {}
  register(newUser: Omit<UserDTO, "id">): void {
    throw new Error("Method not implemented.");
  }
  findUserByEmail(email: string): Promise<UserRecord | undefined> {
    throw new Error("Method not implemented.");
  }
}
