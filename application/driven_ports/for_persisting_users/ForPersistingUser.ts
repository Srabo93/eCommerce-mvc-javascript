import { UserDTO, UserRecord } from "../../anti-corruption-layer/UsersMapper.ts";

export interface ForPersistingUsers {
  registerUser(newUser: Omit<UserDTO, "id">): void;
  findUserByEmail(email: string): Promise<UserRecord | undefined>;
}
