import { AccessToken } from '../../domain/access-token';

export class LoggedEvent {
  constructor(public readonly accessToken: AccessToken) {}
}
