import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infrastructure/persistence/prisma/prisma-provider';
import { Post } from '../../../domain/post';
import { PostRepository } from '../../../domain/post.repository';
import { Author } from '../../../domain/author';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  NUMBER_BY_PAGE = 10;
  constructor(private prismaProvider: PrismaProvider) {}

  async create(post: Post): Promise<Post> {
    const entity = await this.prismaProvider.post.create({
      data: {
        content: post.content,
        authorId: post.author.email,
      },
    });

    return new Post(entity.content, new Author(entity.authorId));
  }

  async findMany(page: number, cursor: number | null): Promise<Post[]> {
    let entities;
    if (cursor === null) {
      entities = await this.prismaProvider.post.findMany({
        skip: page * this.NUMBER_BY_PAGE,
        take: this.NUMBER_BY_PAGE,
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });
    } else {
      entities = await this.prismaProvider.post.findMany({
        skip: page * this.NUMBER_BY_PAGE,
        take: this.NUMBER_BY_PAGE,
        cursor: {
          id: cursor,
        },
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });
    }

    return entities.map((entity) => {
      return new Post(entity.content, new Author(entity.authorId));
    });
  }
}
