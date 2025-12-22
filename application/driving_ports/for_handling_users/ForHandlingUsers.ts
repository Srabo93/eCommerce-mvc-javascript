import { UserRecord } from "@driving_adapters/user_api/UserHttpMapper.ts";
import { User } from "../../User.ts";

export interface ForHandlingUsers {
  registerUser(newUser: User): void;
  findUserByEmail(email: string): Promise<UserRecord | undefined>;
}
