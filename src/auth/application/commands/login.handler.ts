import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { LoggedEvent } from '../events/logged.event';
import { AccessToken } from '../../domain/access-token';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import * as bcrypt from 'bcrypt';
import { BadLoginException } from '../../domain/exceptions/bad-login.exception';
import { AccessTokenGenerator } from '../../domain/access-token-generator';
import { Payload } from '../../domain/payload';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('AccessTokenGenerator')
    private readonly accessTokenGenerator: AccessTokenGenerator,
  ) {}

  /**
   *  @throws {UserNotFoundException, BadLoginException}
   */
  async execute(loginCommand: LoginCommand): Promise<AccessToken> {
    const user = await this.userRepository.findOne(loginCommand.email);

    if (await bcrypt.compare(loginCommand.password, user.password)) {
      const accessToken = this.accessTokenGenerator.generate(
        new Payload(user.email),
      );
      this.eventBus.publish(new LoggedEvent(accessToken));
      return accessToken;
    }

    throw new BadLoginException(`Wrong password for ${loginCommand.email}.`);
  }
}
