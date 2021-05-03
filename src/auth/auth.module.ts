import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './infrastructure/ui/http/auth.controller';
import { RegisterHandler } from './application/commands/register.handler';
import { LoginHandler } from './application/commands/login.handler';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/domain/jwt/jwt.strategy';
import { JwtAccessTokenGenerator } from './infrastructure/domain/jwt/jwt-access-token-generator';
import { PassportModule } from '@nestjs/passport';
import { PrismaProvider } from './infrastructure/persistence/prisma/prisma-provider';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterHandler,
    LoginHandler,
    JwtStrategy,
    PrismaProvider,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'AccessTokenGenerator', useClass: JwtAccessTokenGenerator },
  ],
})
export class AuthModule {}
