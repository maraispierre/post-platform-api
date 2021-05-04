import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
