import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user';

export class FakeUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    return user;
  }

  async findOne(email: string): Promise<User> {
    return new User(
      email,
      '$2b$10$xjigohBsMEtbMwUQsmNmDOJCb.g3SeGKk7Zl/2WxFwSL4ALw9SL3O',
    );
  }
}
