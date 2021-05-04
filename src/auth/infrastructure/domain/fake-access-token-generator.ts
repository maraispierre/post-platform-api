import { AccessTokenGenerator } from '../../domain/access-token-generator';
import { Payload } from '../../domain/payload';
import { AccessToken } from '../../domain/access-token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeAccessTokenGenerator implements AccessTokenGenerator {
  generate(payload: Payload): AccessToken {
    return new AccessToken(payload.email);
  }
}
