import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostController } from './infrastructure/ui/http/post.controller';
import { PublishPostHandler } from './application/commands/publish-post.handler';
import { PassportModule } from '@nestjs/passport';
import { PrismaPostRepository } from './infrastructure/persistence/prisma/prisma-post.repository';
import { SharedModule } from '../shared/shared.module';
import { DisplayPostsHandler } from './application/queries/display-posts.handler';

@Module({
  imports: [CqrsModule, PassportModule, SharedModule],
  controllers: [PostController],
  providers: [
    PublishPostHandler,
    DisplayPostsHandler,
    { provide: 'PostRepository', useClass: PrismaPostRepository },
  ],
})
export class PostModule {}
