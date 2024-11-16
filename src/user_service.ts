import { UserRepository, User } from "./user_repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findUserByID(id: number): Promise<User | undefined> {
    try {
      return this.userRepository.findOne(id);
    } catch (err) {
      return;
    }
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
