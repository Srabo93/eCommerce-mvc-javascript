import { ForPersistingUsers } from "@application/driven_ports/for_persisting_users/ForPersistingUsers.ts";
import { UserRecord } from "@application/driven_ports/for_persisting_users/dto.ts";
import { RegisterNewUser } from "@application/driving_ports/for_handling_users/dto.ts";

export class InMemoryUsersDB implements ForPersistingUsers {
  constructor(private _users: UserRecord[] = []) {}

  registerUser(newUser: RegisterNewUser): Promise<void> {
    return new Promise((resolve, _reject) => {
      this._users.push({ userId: 303, ...newUser });
      resolve();
    });
  }

  findUserByEmail(email: string): Promise<UserRecord | null> {
    const userFound = this._users.find(
      (userRecord) => userRecord.email === email,
    );

    if (!userFound) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    return new Promise((resolve, _reject) => {
      resolve(userFound);
    });
  }
}
