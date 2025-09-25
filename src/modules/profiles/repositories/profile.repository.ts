import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class ProfileRepository {
    constructor(private readonly prisma: PrismaService) { }

    async updateProfile(
        userID: number,
        dataUpdate,
    ) {
        return await this.prisma.user.update({
            where: {
                id: userID
            },
            data: {
                ...dataUpdate,
                updatedBy: userID
            },
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                phone: true,
            }
        })
    }







}