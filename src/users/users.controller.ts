import { User } from '@prisma/client';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './usersService.service';
import { UserDto } from './user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get("")
    async getUsers(): Promise<User[]> {
        return await this.userService.users({})
    }

    @Post()
    async createUser(@Body() user: UserDto): Promise<User> {
        try {
            return await this.userService.createUser(user)
        } catch (error) {
            if (error.message === "user with that email already exists") throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Put()
    async changeUser(@Body() user: Required<User>) {
        return await this.userService.updateUser({
            where: {
                id: user.id
            },
            data: user
        })
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return await this.userService.deleteUser({ id: id as unknown as number })
    }
}
