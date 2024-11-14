export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface UserRepository {
  findOne(id: number): User | undefined;
  findAll(): User[];
}
