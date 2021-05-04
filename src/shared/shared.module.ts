import { Module } from '@nestjs/common';
import { PrismaProvider } from './infrastructure/persistence/prisma/prisma-provider';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class SharedModule {}
