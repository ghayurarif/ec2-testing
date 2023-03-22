import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) {
    }
    async getPost(
        postWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
        });
    }
    async getPosts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<Post[]> {
        return this.prisma.post.findMany({ ...params, include: { author: true } })
    }
    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        try {
            const post = await this.prisma.post.findFirst({ where: { title: data.title } })
            console.log(post);
            if (post) throw new Error("Post with that title already exists")
            return this.prisma.post.create({
                data,
            });
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
    }): Promise<Post> {
        try {
            const { where, data } = params;
            if (data.title) {
                const post = await this.prisma.post.findFirst({ where: { title: data as string } })
                if (post) throw new Error("Post with that title already exists")
            }
            return this.prisma.post.update({
                data,
                where,
            });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }
}