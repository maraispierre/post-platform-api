import { AccessToken } from '../../domain/access-token';

export class RegisteredEvent {
  public readonly accessToken: AccessToken;

  constructor(accessToken: AccessToken) {
    this.accessToken = accessToken;
  }
}
