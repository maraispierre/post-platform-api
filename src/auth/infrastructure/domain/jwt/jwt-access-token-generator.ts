import { AccessTokenGenerator } from '../../../domain/access-token-generator';
import { Payload } from '../../../domain/payload';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '../../../domain/access-token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessTokenGenerator implements AccessTokenGenerator {
  constructor(private jwtService: JwtService) {}
  generate(payload: Payload): AccessToken {
    return new AccessToken(
      this.jwtService.sign({
        email: payload.email,
      }),
    );
  }
}
