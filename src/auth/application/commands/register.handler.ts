import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { RegisteredEvent } from '../events/registered.event';
import { User } from '../../domain/user';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { AccessToken } from '../../domain/access-token';
import { AccessTokenGenerator } from '../../domain/access-token-generator';
import { Payload } from '../../domain/payload';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject('UserRepository')
    private readonly repository: UserRepository,
    @Inject('AccessTokenGenerator')
    private readonly accessTokenGenerator: AccessTokenGenerator,
  ) {}

  /**
   *  @throws {UserAlreadyExistsException}
   */
  async execute(command: RegisterCommand): Promise<AccessToken> {
    const user = new User(
      command.email,
      await bcrypt.hash(command.password, 10),
    );

    await this.repository.create(user);

    const accessToken = this.accessTokenGenerator.generate(
      new Payload(user.email),
    );

    this.eventBus.publish(new RegisteredEvent(accessToken));

    return accessToken;
  }
}
