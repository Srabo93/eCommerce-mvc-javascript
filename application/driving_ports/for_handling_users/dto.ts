import { UserRole } from "../../User.ts";

export type RegisterNewUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type UserDTO = {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
