import { User, UserRepository } from "../user_repository";

const mockUsers = [
  {
    id: 1,
    name: "mock user 1 please connect read db",
    email: "mock1@hotmail.com",
    age: 99,
  },
  {
    id: 2,
    name: "mock user 2 please connect read db",
    email: "mock2@hotmail.com",
    age: 99,
  },
];

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    this.users = mockUsers;
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  findAll(): User[] {
    return this.users;
  }
}
