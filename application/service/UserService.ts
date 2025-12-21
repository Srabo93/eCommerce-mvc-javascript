import { ForHandlingUsers } from "../driving_ports/for_handling_users/ForHandlingUsers.ts";
import { ForPersistingUsers } from "../driven_ports/for_persisting_users/ForPersistingUser.ts";

export class UserService implements ForHandlingUsers {
  constructor(private readonly repository: ForPersistingUsers) {}
  registerUser(newUser: Omit<UserDTO, "id">): void {
    throw new Error("Method not implemented.");
  }
  findUserByEmail(email: string): Promise<UserRecord | undefined> {
    throw new Error("Method not implemented.");
  }
}
