import { ModuleRef } from '@nestjs/core';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { PublishPostHandler } from '../../../../post/application/commands/publish-post.handler';
import { PostRepository } from '../../../../post/domain/post.repository';
import { FakePostRepository } from '../../../../post/infrastructure/persistence/fake-post.repository';
import { Post } from '../../../../post/domain/post';
import { PublishPostCommand } from '../../../../post/application/commands/publish-post.command';
import { Author } from '../../../../post/domain/author';

describe('PublishPost', () => {
  const CONTENT = 'content';
  const EMAIL = 'test@test.fr';
  const AUTHOR = new Author(EMAIL);

  let commandBus: CommandBus;
  let moduleRef: ModuleRef;

  let publishPostHandler: PublishPostHandler;
  let eventBus: EventBus;
  let postRepository: PostRepository;

  beforeEach(async () => {
    eventBus = new EventBus(commandBus, moduleRef);
    postRepository = new FakePostRepository();
    publishPostHandler = new PublishPostHandler(eventBus, postRepository);
  });

  describe('execute', () => {
    it('should return Post', async () => {
      jest.spyOn(eventBus, 'publish').mockImplementation(async () => null);
      jest
        .spyOn(postRepository, 'create')
        .mockImplementation(async () => new Post(CONTENT, AUTHOR));

      const command = new PublishPostCommand(CONTENT, EMAIL);
      const post = await publishPostHandler.execute(command);
      expect(post.content).toEqual(CONTENT);
      expect(post.author.email).toEqual(EMAIL);
    });
  });
});
