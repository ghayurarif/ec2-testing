import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './usersService.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UserService, PrismaService],
})
export class UserModule { }