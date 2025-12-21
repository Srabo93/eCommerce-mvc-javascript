import { ForHandlingUsers } from "@application/inbound/user/UserController.ts";
import { UserDTO, UserRecord } from "../anti-corruption-layer/UsersMapper.ts";
import { UserService } from "@application/service/user.ts";

export class UserController {
  constructor(private readonly userService: UserService) {}
  async findUserByEmail(email: string): Promise<UserRecord | undefined> {}
  register(newUser: Omit<UserDTO, "id">): void {}
}
