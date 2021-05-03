import { AccessToken } from './access-token';
import { Payload } from './payload';

export interface AccessTokenGenerator {
  generate(payload: Payload): AccessToken;
}
