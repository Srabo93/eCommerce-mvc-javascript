import { RegisterNewUser } from "../../driving_ports/for_handling_users/dto.ts";
import { LoginUserRecord } from "./dto.ts";

export interface ForPersistingUsers {
  registerUser(newUser: RegisterNewUser): Promise<void>;
  loginUser(email: string): Promise<LoginUserRecord | null>;
}
