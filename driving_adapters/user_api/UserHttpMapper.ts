import * as z from "zod";
import { User } from "@application/User.ts";

export const UserSchema = z.object({
  email: z.email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(["user", "admin"]),
});

export type UserDTO = z.infer<typeof UserSchema>;

export const UserRecordSchema = z.object({
  id: z.number().int().positive(),
  email: z.email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(["user", "admin"]),
});

export type UserRecord = z.infer<typeof UserRecordSchema>;

export const PublicUserDTOSchema = z.object({
  id: z.number().int().positive(),
  email: z.email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  role: z.enum(["user", "admin"]),
});

export type PublicUserDTO = z.infer<typeof PublicUserDTOSchema>;

export class UsersMapper {
  static toEntity(record: UserRecord): User {
    return User.create({
      email: record.email,
      firstName: record.firstName,
      lastName: record.lastName,
      role: record.role,
    });
  }

  static toRecord(user: PublicUserDTO): UserRecord {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  static toPublicDTO(record: UserRecord): PublicUserDTO {
    return {
      id: record.id,
      email: record.email,
      firstName: record.firstName,
      lastName: record.lastName,
      role: record.role,
    };
  }
}
