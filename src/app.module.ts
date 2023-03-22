import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [UserModule, PostsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule { }
