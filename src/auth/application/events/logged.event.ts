import { AccessToken } from '../../domain/access-token';

export class LoggedEvent {
  public readonly accessToken: AccessToken;

  constructor(accessToken: AccessToken) {
    this.accessToken = accessToken;
  }
}
