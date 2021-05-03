import { ModuleRef } from '@nestjs/core';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { RegisterHandler } from '../../../../auth/application/commands/register.handler';
import { RegisterCommand } from '../../../../auth/application/commands/register.command';
import { User } from '../../../../auth/domain/user';
import { FakeUserRepository } from '../../../../auth/infrastructure/persistence/fake-user.repository';
import { Profile } from '../../../../auth/domain/profile';
import { UserRepository } from '../../../../auth/domain/user.repository';

describe('RegisterHandler', () => {
  const EMAIL = 'test@test.fr';
  const PASSWORD = 'password';

  let commandBus: CommandBus;
  let moduleRef: ModuleRef;

  let registerHandler: RegisterHandler;
  let eventBus: EventBus;
  let userRepository: UserRepository;

  beforeEach(async () => {
    eventBus = new EventBus(commandBus, moduleRef);
    userRepository = new FakeUserRepository();
    registerHandler = new RegisterHandler(eventBus, userRepository);
  });

  describe('execute', () => {
    it('should return Profile', async () => {
      const profile = new Profile(EMAIL);

      jest.spyOn(eventBus, 'publish').mockImplementation(async () => null);
      jest
        .spyOn(userRepository, 'create')
        .mockImplementation(async () => new User(EMAIL, PASSWORD));

      const command = new RegisterCommand(EMAIL, PASSWORD);
      expect(await registerHandler.execute(command)).toEqual(profile);
    });
  });
});
