import { UserRepository } from '../../../domain/user.repository';
import { User } from '../../../domain/user';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infrastructure/persistence/prisma/prisma-provider';
import { UserNotFoundException } from '../../../domain/exceptions/user-not-found.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaErrorCode } from './prisma-error.code';
import { UserAlreadyExistsException } from '../../../domain/exceptions/user-already-exists.exception';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaProvider: PrismaProvider) {}

  async create(user: User): Promise<User> {
    try {
      await this.prismaProvider.user.create({
        data: {
          email: user.email,
          password: user.password,
        },
      });
    } catch (e) {
      if (
        e instanceof PrismaClientKnownRequestError &&
        e.code === PrismaErrorCode.UNIQUE_CONSTRAINT_FAILED
      ) {
        throw new UserAlreadyExistsException(
          `User with email ${user.email} already exists.`,
        );
      }
      throw e;
    }

    return user;
  }

  async findOne(email: string): Promise<User> {
    const prismaUser = await this.prismaProvider.user.findUnique({
      where: {
        email: email,
      },
    });

    if (prismaUser === null) {
      throw new UserNotFoundException(
        `User with email ${email} doesn't exist.`,
      );
    }

    return new User(prismaUser.email, prismaUser.password);
  }
}
