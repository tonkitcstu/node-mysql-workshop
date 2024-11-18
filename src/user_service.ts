import { UserRepository, User } from "./user_repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findUserByID(id: number): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne(id);
      return user;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async findAllUser(): Promise<User[]> {
    let users: User[] = [];
    try {
      users = await this.userRepository.findAll();
    } catch (err) {
      console.log(err);
    }
    return users;
  }
}
