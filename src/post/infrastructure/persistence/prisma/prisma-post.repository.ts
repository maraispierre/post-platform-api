import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infrastructure/persistence/prisma/prisma-provider';
import { Post } from '../../../domain/post';
import { PostRepository } from '../../../domain/post.repository';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prismaProvider: PrismaProvider) {}

  async create(post: Post): Promise<Post> {
    return await this.prismaProvider.post.create({
      data: {
        content: post.content,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prismaProvider.post.findMany();
  }
}
