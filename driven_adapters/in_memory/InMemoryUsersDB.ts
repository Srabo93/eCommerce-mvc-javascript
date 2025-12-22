import { ForPersistingUsers } from "@application/driven_ports/for_persisting_users/ForPersistingUsers.ts";
import {
  UserRecord,
  UserDTO,
  UsersMapper,
} from "@driving_adapters/user_api/UserHttpMapper.ts";

export class InMemoryUsersDB implements ForPersistingUsers {
  constructor(private _users: any[] = []) {}

  findUserByEmail(email: string): Promise<UserRecord | undefined> {
    const userFound = this._users.find(
      (userRecord) => userRecord.email === email,
    );
    return new Promise((resolve, _reject) => {
      resolve(userFound);
    });
  }

  registerUser(newUser: Omit<UserDTO, "id">): void {
    this._users.push(UsersMapper.toRecord({ id: 303, ...newUser }));
  }
}
