import { PostRepository } from '../../../../post/domain/post.repository';
import { FakePostRepository } from '../../../../post/infrastructure/persistence/fake-post.repository';
import { DisplayPostsHandler } from '../../../../post/application/queries/display-posts.handler';
import { DisplayPostsQuery } from '../../../../post/application/queries/display-posts.query';

describe('DisplayPosts', () => {
  let displayPostsHandler: DisplayPostsHandler;
  let postRepository: PostRepository;

  beforeEach(async () => {
    postRepository = new FakePostRepository();
    displayPostsHandler = new DisplayPostsHandler(postRepository);
  });

  describe('execute', () => {
    it('should return Post[]', async () => {
      jest.spyOn(postRepository, 'findMany').mockImplementation(async () => []);

      const display = await displayPostsHandler.execute(
        new DisplayPostsQuery(0, null),
      );
      expect(display.length).toEqual(0);
    });
  });
});
