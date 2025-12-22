import {
  UserDTO,
  UserRecord,
} from "@driving_adapters/user_api/UserHttpMapper.ts";
import { ForPersistingUsers } from "../driven_ports/for_persisting_users/ForPersistingUsers.ts";
import { ForHandlingUsers } from "../driving_ports/for_handling_users/ForHandlingUsers.ts";

export class UserService implements ForHandlingUsers {
  constructor(private readonly repository: ForPersistingUsers) {}
  registerUser(newUser: Omit<UserDTO, "id">): void {
    throw new Error("Method not implemented.");
  }
  findUserByEmail(email: string): Promise<UserRecord | undefined> {
    throw new Error("Method not implemented.");
  }
}
