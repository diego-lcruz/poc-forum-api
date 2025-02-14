import { Post, Body,Controller } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async singUp(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }
}
