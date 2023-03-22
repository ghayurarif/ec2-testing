import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from './postsService.service';

@Module({
    controllers: [PostsController],
    providers: [PrismaService, PostsService]
})
export class PostsModule {
}
