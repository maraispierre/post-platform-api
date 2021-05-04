import { PostRepository } from '../../domain/post.repository';
import { Post } from '../../domain/post';

export class FakePostRepository implements PostRepository {
  async create(post: Post): Promise<Post> {
    return post;
  }

  async findAll(): Promise<Post[]> {
    return [];
  }
}
