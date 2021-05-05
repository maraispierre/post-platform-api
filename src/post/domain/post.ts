import { Author } from './author';

export class Post {
  public readonly id: number | null = undefined;
  constructor(public readonly content, public readonly author: Author) {}
}
