import { User } from './user';

export interface UserRepository {
  /**
   *  @throws {UserAlreadyExistsException}
   */
  create(user: User): Promise<User>;

  /**
   *  @throws {UserNotFoundException}
   */
  findOne(email: string): Promise<User>;
}
