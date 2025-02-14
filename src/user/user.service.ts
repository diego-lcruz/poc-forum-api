import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService;

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10);


        return this.prisma.user.create({ 
            data: {...data, password: hashedPassword} 
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }):Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({ where, data });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput):Promise<User> {
        return this.prisma.user.delete({ where });
    }

    
}
