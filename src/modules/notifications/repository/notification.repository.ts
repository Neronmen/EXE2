import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class NotificationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createSystemNotification(
        title: string,
        content: string,
    ) {
        return this.prisma.notification.create({
            data: { title, content },
        });
    }

    async createUserNotification(
        senderID: number,
        receiverID: number,
        title: string,
        content: string,
    ) {
        return this.prisma.notification.create({
            data: { senderID, receiverID, title, content },
        });
    }
    getUserNotification(userID: number, skip = 0, take = 20) {
        return this.prisma.notification.findMany({
            where: { receiverID: userID },

            orderBy: { createdAt: 'desc' },
            skip,
            take: take === -1 ? undefined : take,
            select: {
                id: true,
                title: true,
                content: true,
                type: true,
                senderType: true,
                metadata: true,
                isRead: true,
                createdAt: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        roleID: true,
                    }
                }
            }
        });
    }


    countUserNotification(userID: number) {
        return this.prisma.notification.count({
            where: { receiverID: userID },
        });
    }


}