import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DisplayPostsQuery } from './display-posts.query';
import { Post } from '../../domain/post';
import { Inject } from '@nestjs/common';
import { PostRepository } from '../../domain/post.repository';

@QueryHandler(DisplayPostsQuery)
export class DisplayPostsHandler implements IQueryHandler<DisplayPostsQuery> {
  constructor(
    @Inject('PostRepository')
    private readonly repository: PostRepository,
  ) {}

  async execute(query: DisplayPostsQuery): Promise<Post[]> {
    return await this.repository.findAll();
  }
}
