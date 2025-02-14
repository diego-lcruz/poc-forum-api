import { Post, Body, Controller, Param, Get, Put, Delete } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    async singUp(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }


    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel | null> {
        return this.userService.user({ id: Number(id) });
    }

    @Put()
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string,
    ): Promise<UserModel> {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }

}
