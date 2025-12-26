import { UserRole } from "../../User.ts";

export type UserRecord = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
