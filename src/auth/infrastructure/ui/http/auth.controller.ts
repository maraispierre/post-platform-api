import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterRequest } from './register.request';
import { RegisterCommand } from '../../../application/commands/register.command';
import { LoginCommand } from '../../../application/commands/login.command';
import { LoginRequest } from './login.request';
import { BadLoginException } from '../../../domain/exceptions/bad-login.exception';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from '../../../domain/exceptions/user-already-exists.exception';
import { AccessToken } from '../../../domain/access-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('register')
  public async register(
    @Body() registerRequest: RegisterRequest,
  ): Promise<AccessToken> {
    try {
      return await this.commandBus.execute(
        new RegisterCommand(registerRequest.email, registerRequest.password),
      );
    } catch (e) {
      if (e instanceof UserAlreadyExistsException) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
  }

  @Post('login')
  public async login(@Body() loginRequest: LoginRequest): Promise<AccessToken> {
    try {
      return await this.commandBus.execute(
        new LoginCommand(loginRequest.email, loginRequest.password),
      );
    } catch (e) {
      if (
        e instanceof BadLoginException ||
        e instanceof UserNotFoundException
      ) {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
  }
}
