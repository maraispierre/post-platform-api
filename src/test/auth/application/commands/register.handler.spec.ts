import { ModuleRef } from '@nestjs/core';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { RegisterHandler } from '../../../../auth/application/commands/register.handler';
import { RegisterCommand } from '../../../../auth/application/commands/register.command';
import { User } from '../../../../auth/domain/user';
import { FakeUserRepository } from '../../../../auth/infrastructure/persistence/fake-user.repository';
import { UserRepository } from '../../../../auth/domain/user.repository';
import { AccessTokenGenerator } from '../../../../auth/domain/access-token-generator';
import { FakeAccessTokenGenerator } from '../../../../auth/infrastructure/domain/fake-access-token-generator';
import { AccessToken } from '../../../../auth/domain/access-token';

describe('RegisterHandler', () => {
  const EMAIL = 'test@test.fr';
  const PASSWORD = 'password';

  let commandBus: CommandBus;
  let moduleRef: ModuleRef;

  let registerHandler: RegisterHandler;
  let eventBus: EventBus;
  let userRepository: UserRepository;
  let accessTokenGenerator: AccessTokenGenerator;

  beforeEach(async () => {
    eventBus = new EventBus(commandBus, moduleRef);
    userRepository = new FakeUserRepository();
    accessTokenGenerator = new FakeAccessTokenGenerator();
    registerHandler = new RegisterHandler(
      eventBus,
      userRepository,
      accessTokenGenerator,
    );
  });

  describe('execute', () => {
    it('should return AccessToken', async () => {
      const accessToken = new AccessToken(EMAIL);

      jest.spyOn(eventBus, 'publish').mockImplementation(async () => null);
      jest
        .spyOn(userRepository, 'create')
        .mockImplementation(async () => new User(EMAIL, PASSWORD));
      jest
        .spyOn(accessTokenGenerator, 'generate')
        .mockImplementation(() => new AccessToken(EMAIL));

      const command = new RegisterCommand(EMAIL, PASSWORD);
      expect(await registerHandler.execute(command)).toEqual(accessToken);
    });
  });
});
