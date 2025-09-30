import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class ChangePassProfileRepository {
    constructor(private readonly prisma: PrismaService) {}

    async updatePassword(userID: number, hashNewPassword: string) {
        return this.prisma.user.update({
            where: { id: userID },
            data: {
                password: hashNewPassword
            },
            select: {
                id: true,
                email: true,
                phone: true,
                name: true,
                roleID: true,
            }
        });
    }
}
