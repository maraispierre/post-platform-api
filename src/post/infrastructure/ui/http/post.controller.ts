import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PublishPostRequest } from './publish-post.request';
import { PublishPostCommand } from '../../../application/commands/publish-post.command';
import { Post as PostObject } from '../../../domain/post';
import { JwtAuthGuard } from '../../../../shared/infrastructure/jwt/jwt-auth.guard';
import { DisplayPostsQuery } from '../../../application/queries/display-posts.query';

@Controller('post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('publish')
  public async publish(
    @Body() publishPostRequest: PublishPostRequest,
  ): Promise<PostObject> {
    return await this.commandBus.execute(
      new PublishPostCommand(publishPostRequest.content),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('display')
  public async display(): Promise<PostObject[]> {
    return await this.queryBus.execute(new DisplayPostsQuery());
  }
}
