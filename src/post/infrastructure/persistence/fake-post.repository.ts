import { PostRepository } from '../../domain/post.repository';
import { Post } from '../../domain/post';

export class FakePostRepository implements PostRepository {
  async create(post: Post): Promise<Post> {
    return post;
  }

  async findMany(page: number, cursor: number | null): Promise<Post[]> {
    return [];
  }
}
