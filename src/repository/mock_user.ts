import { User, UserRepository } from "../user_repository";

const mockUsers = [
  {
    id: 1,
    name: "mock user 1 please connect a real db",
    email: "mock1@hotmail.com",
    age: 99,
  },
  {
    id: 2,
    name: "mock user 2 please connect a real db",
    email: "mock2@hotmail.com",
    age: 99,
  },
];

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  constructor() {
    this.users = mockUsers;
  }

  findOne(id: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      resolve(this.users.find((u) => u.id === id));
    });
  }

  findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      resolve(this.users);
    });
  }
}
