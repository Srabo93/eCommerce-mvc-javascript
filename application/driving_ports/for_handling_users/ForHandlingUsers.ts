import { UserRecord } from "../../driven_ports/for_persisting_users/dto.ts";

export interface ForHandlingUsers {
  registerUser(newUser: unknown): void;
  findUserByEmail(email: string): Promise<UserRecord | null>;
}
