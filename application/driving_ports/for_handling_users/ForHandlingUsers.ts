import { UserRecord } from "../../anti-corruption-layer/UsersMapper.ts";
import { User } from "../../User.ts";

export interface ForHandlingUsers {
  registerUser(newUser: User): void;
  findUserByEmail(email: string): Promise<UserRecord | undefined>;
}
