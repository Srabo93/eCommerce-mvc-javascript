import { UserRecord } from "@application/anti-corruption-layer/UsersMapper.ts";
import { UserService } from "@application/service/UserService.ts";

export class UserHttpAdapter {
  constructor(private readonly userService: UserService) {}
  async findUserByEmail(email: string): Promise<UserRecord | undefined> {}
}
