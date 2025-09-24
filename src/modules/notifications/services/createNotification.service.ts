import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationGateway } from '../gateway/notification.gateway';
import { CreateNotificationDto } from '../dtos/createNotification.dto';
import { successResponse } from 'src/common/utils/response.util';
import { NotificationRepository } from '../repository/notification.repository';
import { NotificationType, SenderType } from '@prisma/client';

@Injectable()
export class CreateNotificationService {
    constructor(
        private prisma: PrismaService,
        private gateway: NotificationGateway,
        private readonly repository: NotificationRepository,

    ) { }

    async createNotification(data: CreateNotificationDto, user) {
        let userIDs = data.userIDs;

        // Nếu không truyền userIDs => broadcast
        if (!userIDs || userIDs.length === 0) {
            // Lấy toàn bộ user
            let allUsers = await this.prisma.user.findMany({
                select: { id: true },
            });

            // Loại bỏ người tạo
            allUsers = allUsers.filter(u => u.id !== user.id);
            userIDs = allUsers.map(u => u.id);
        }

        // Tạo dữ liệu insert
        const notificationsData = userIDs.map(userId => ({
            title: data.title,
            content: data.content,
            type: NotificationType.SYSTEM,
            senderType: SenderType.SYSTEM,
            receiverID: userId,
            senderID: user?.id ?? null, // nếu system gửi thì có thể để null
        }));

        // Insert nhiều record 1 lần
        await this.prisma.notification.createMany({
            data: notificationsData,
        });

        // Gửi realtime tới từng user
        for (const userId of userIDs) {
            this.gateway.sendToUser(userId, {
                title: data.title,
                content: data.content,
                isRead: false,
                createdAt: new Date(),
            });
        }

        return successResponse(200, 'Gửi thông báo thành công');
    }


}
