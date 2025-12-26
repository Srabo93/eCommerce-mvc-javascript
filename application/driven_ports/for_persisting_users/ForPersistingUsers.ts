import { RegisterNewUser } from "../../driving_ports/for_handling_users/dto.ts";
import { UserRecord } from "./dto.ts";

export interface ForPersistingUsers {
  registerUser(newUser: RegisterNewUser): Promise<void>;
  findUserByEmail(email: string): Promise<UserRecord>;
}
