import {
  UserDTO,
  UserRecord,
} from "@driving_adapters/user_api/UserHttpMapper.ts";

export interface ForPersistingUsers {
  registerUser(newUser: Omit<UserDTO, "id">): void;
  findUserByEmail(email: string): Promise<UserRecord | undefined>;
}
