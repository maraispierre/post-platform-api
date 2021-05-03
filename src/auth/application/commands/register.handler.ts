import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from './register.command';
import { RegisteredEvent } from '../events/registered.event';
import { User } from '../../domain/user';
import { Profile } from '../../domain/profile';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  /**
   *  @throws {UserAlreadyExistsException}
   */
  async execute(command: RegisterCommand): Promise<Profile> {
    const user = new User(
      command.email,
      await bcrypt.hash(command.password, 10),
    );

    await this.repository.create(user);

    const profile = new Profile(user.email);

    this.eventBus.publish(new RegisteredEvent(profile));

    return profile;
  }
}
