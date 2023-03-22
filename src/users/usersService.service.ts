import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        return this.prisma.user.findMany({
            ...params
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            const user = await this.prisma.user.findFirst({ where: { email: data.email } })
            if (user) throw new Error("user with that email already exists")
            return this.prisma.user.create({
                data,
            });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        try {
            const { where, data } = params;
            if (data.email) {
                const user = await this.prisma.user.findFirst({ where: { email: data.email as string } })
                if (user) throw new Error("user with that email already exists")
            }
            return this.prisma.user.update({
                data,
                where,
            });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}