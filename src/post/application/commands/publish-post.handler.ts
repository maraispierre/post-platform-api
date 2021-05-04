import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PublishPostCommand } from './publish-post.command';
import { PostPublishedEvent } from '../events/post-published.event';
import { Post } from '../../domain/post';
import { Inject } from '@nestjs/common';
import { PostRepository } from '../../domain/post.repository';

@CommandHandler(PublishPostCommand)
export class PublishPostHandler implements ICommandHandler<PublishPostCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject('PostRepository')
    private readonly repository: PostRepository,
  ) {}

  async execute(command: PublishPostCommand): Promise<Post> {
    const post = new Post(command.content);

    await this.repository.create(post);
    this.eventBus.publish(new PostPublishedEvent(post));

    return post;
  }
}
