import { UserRole } from "../../User.ts";

export type LoginUserRecord = {
  userId: number;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type UserRecord = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
