import { Post as PrismaPost } from '@prisma/client';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './postsService.service';
import { PostDto } from './post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get("")
    async getPosts(): Promise<PrismaPost[]> {
        return await this.postsService.getPosts({})
    }

    @Post("")
    async createPost(@Body() user: PostDto): Promise<PrismaPost> {
        try {
            return await this.postsService.createPost(user)
        } catch (error) {
            if (error.message === "Post with that title already exists") throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put()
    async changePost(@Body() user: Required<PrismaPost>) {
        return await this.postsService.updatePost({
            where: {
                id: user.id
            },
            data: user
        })
    }

    @Delete(":id")
    async deletePost(@Param("id") id: string) {
        return await this.postsService.deletePost({ id: id as unknown as number })
    }
}
