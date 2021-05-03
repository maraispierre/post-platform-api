import { ModuleRef } from '@nestjs/core';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { RegisterHandler } from '../../../../auth/application/commands/register.handler';
import { RegisterCommand } from '../../../../auth/application/commands/register.command';
import { User } from '../../../../auth/domain/user';
import { FakeUserRepository } from '../../../../auth/infrastructure/persistence/fake-user.repository';
import { Profile } from '../../../../auth/domain/profile';
import { LoginHandler } from '../../../../auth/application/commands/login.handler';
import { FakeAccessTokenGenerator } from '../../../../auth/infrastructure/domain/fake-access-token-generator';
import { AccessToken } from '../../../../auth/domain/access-token';
import { LoginCommand } from '../../../../auth/application/commands/login.command';
import { AccessTokenGenerator } from '../../../../auth/domain/access-token-generator';
import { UserRepository } from '../../../../auth/domain/user.repository';

describe('LoginHandler', () => {
  const EMAIL = 'test@test.fr';
  const PASSWORD = 'test';
  const HASHED_PASSWORD =
    '$2b$10$xjigohBsMEtbMwUQsmNmDOJCb.g3SeGKk7Zl/2WxFwSL4ALw9SL3O';

  let commandBus: CommandBus;
  let moduleRef: ModuleRef;

  let loginHandler: LoginHandler;
  let fakeAccessTokenGenerator: AccessTokenGenerator;
  let eventBus: EventBus;
  let userRepository: UserRepository;

  beforeEach(async () => {
    eventBus = new EventBus(commandBus, moduleRef);
    userRepository = new FakeUserRepository();
    fakeAccessTokenGenerator = new FakeAccessTokenGenerator();
    loginHandler = new LoginHandler(
      eventBus,
      userRepository,
      fakeAccessTokenGenerator,
    );
  });

  describe('execute', () => {
    it('should return AccessToken', async () => {
      const accessToken = new AccessToken('');

      jest.spyOn(eventBus, 'publish').mockImplementation(async () => null);
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => new User(EMAIL, HASHED_PASSWORD));

      const command = new LoginCommand(EMAIL, PASSWORD);
      expect(await loginHandler.execute(command)).toEqual(accessToken);
    });
  });
});
