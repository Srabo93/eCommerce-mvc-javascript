export type UserRole = "user" | "admin";
export interface UserDTO {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export class User {
  private constructor(
    private _email: string,
    private _firstName: string,
    private _lastName: string,
    private _role: UserRole,
  ) {}

  changeEmail(email: string): void {
    this.setEmail(email);
  }

  promoteToAdmin(): void {
    this._role = "admin";
  }

  static create(params: {
    email: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }): User {
    const user = new User(
      params.email,
      params.firstName,
      params.lastName,
      params.role ?? "user",
    );

    user.validate();
    return user;
  }

  private validate(): void {
    this.setEmail(this._email);
    this.setFirstName(this._firstName);
    this.setLastName(this._lastName);
  }

  private setEmail(_email: string): void {
    if (!_email || !_email.includes("@")) {
      throw new Error("Invalid email address");
    }
    this._email = _email.toLowerCase();
  }

  private setFirstName(_firstName: string): void {
    if (!_firstName || _firstName.trim().length < 2) {
      throw new Error("First name must be at least 2 characters");
    }
    this._firstName = _firstName.trim();
  }

  private setLastName(_lastName: string): void {
    if (!_lastName || _lastName.trim().length < 2) {
      throw new Error("Last name must be at least 2 characters");
    }
    this._lastName = _lastName.trim();
  }

  get email(): string {
    return this._email;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get role(): UserRole {
    return this._role;
  }

  get properties(): UserDTO {
    return {
      email: this._email,
      firstName: this._firstName,
      lastName: this._lastName,
      role: this._role,
    };
  }
}
