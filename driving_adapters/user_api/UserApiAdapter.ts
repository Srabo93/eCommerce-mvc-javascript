import { UserService } from "@application/service/UserService.ts";
import { UserRecord } from "./UserHttpMapper.ts";

export class UserApiAdapter {
  constructor(private readonly userService: UserService) {}
  async findUserByEmail(email: string): Promise<UserRecord | undefined> {}
}
