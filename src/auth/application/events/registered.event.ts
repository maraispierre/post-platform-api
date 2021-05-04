import { AccessToken } from '../../domain/access-token';

export class RegisteredEvent {
  constructor(public readonly accessToken: AccessToken) {}
}
