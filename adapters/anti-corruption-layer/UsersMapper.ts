import { User, UserRole } from "@application/User.ts";

export type UserDTO = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type UserRecord = {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
};

export class UsersMapper {
  static toDomain(record: UserRecord): User {
    return User.create({
      email: record.email,
      firstName: record.first_name,
      lastName: record.last_name,
      role: record.role,
    });
  }

  static toPersistence(dto: UserDTO): UserRecord {
    return {
      id: dto.id,
      password: dto.password,
      email: dto.email,
      first_name: dto.firstName,
      last_name: dto.lastName,
      role: dto.role,
    };
  }

  static toDTO(record: UserRecord): UserDTO {
    return {
      id: record.id,
      password: record.password,
      email: record.email,
      firstName: record.first_name,
      lastName: record.last_name,
      role: record.role,
    };
  }

  static toPublicDTO(user: UserRecord): Omit<UserDTO, "password"> {
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    };
  }
}
