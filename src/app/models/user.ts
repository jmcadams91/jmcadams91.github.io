// Frontend User model (client-side)
// Note: the server-side Mongoose model lives in the API project.
// This class provides a runtime value and a TypeScript type for the
// Angular application and unit tests.

export default class User {
  name: string;
  email: string;
  password?: string;

  constructor(init?: Partial<User>) {
    this.name = init?.name ?? '';
    this.email = init?.email ?? '';
    this.password = init?.password;
  }
}
