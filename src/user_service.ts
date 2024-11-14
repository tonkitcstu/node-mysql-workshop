import { UserRepository, User } from "./user_repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  findUserByID(id: number): User | undefined {
    return this.userRepository.findOne(id);
  }

  findAllUser(): User[] {
    return this.userRepository.findAll();
  }
}
