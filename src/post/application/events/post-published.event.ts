import { Post } from '../../domain/post';

export class PostPublishedEvent {
  constructor(public readonly post: Post) {}
}
