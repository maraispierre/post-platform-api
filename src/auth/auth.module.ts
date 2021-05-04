import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './infrastructure/ui/http/auth.controller';
import { RegisterHandler } from './application/commands/register.handler';
import { LoginHandler } from './application/commands/login.handler';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../shared/infrastructure/jwt/jwt.strategy';
import { JwtAccessTokenGenerator } from './infrastructure/domain/jwt/jwt-access-token-generator';
import { PassportModule } from '@nestjs/passport';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    SharedModule,
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
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'AccessTokenGenerator', useClass: JwtAccessTokenGenerator },
  ],
})
export class AuthModule {}
