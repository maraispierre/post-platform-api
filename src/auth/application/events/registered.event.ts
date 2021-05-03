import { Profile } from '../../domain/profile';

export class RegisteredEvent {
  public readonly profile: Profile;

  constructor(profile: Profile) {
    this.profile = profile;
  }
}
