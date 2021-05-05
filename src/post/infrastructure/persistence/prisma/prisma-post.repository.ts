import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infrastructure/persistence/prisma/prisma-provider';
import { Post } from '../../../domain/post';
import { PostRepository } from '../../../domain/post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  NUMBER_BY_PAGE = 10;
  constructor(private prismaProvider: PrismaProvider) {}

  async create(post: Post): Promise<Post> {
    return await this.prismaProvider.post.create({
      data: {
        content: post.content,
      },
    });
  }

  async findMany(page: number, cursor: number | null): Promise<Post[]> {
    if (cursor === null) {
      return await this.prismaProvider.post.findMany({
        skip: page * this.NUMBER_BY_PAGE,
        take: this.NUMBER_BY_PAGE,
        orderBy: [
          {
            id: 'desc',
          },
        ],
      });
    }
    return await this.prismaProvider.post.findMany({
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
}
