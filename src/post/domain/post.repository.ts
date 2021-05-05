import { Post } from './post';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findMany(page: number, cursor: number | null): Promise<Post[]>;
}
