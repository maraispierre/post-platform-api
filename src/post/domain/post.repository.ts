import { Post } from './post';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
}
