import { ForHandlingUsers } from "@application/inbound/user/ForHandlingUsers.ts";
import { ForPersistingUsers } from "@application/outbound/ForPersistingUser.ts";
import { UserDTO, UserRecord } from "../anti-corruption-layer/UsersMapper.ts";

export class UsersHttpController implements ForHandlingUsers {
  constructor(private db: ForPersistingUsers) {}
  async findUserByEmail(email: string): Promise<UserRecord | undefined> {
    return await this.db.findUserByEmail(email);
  }
  register(newUser: Omit<UserDTO, "id">): void {
    this.db.registerUser(newUser);
  }
}
