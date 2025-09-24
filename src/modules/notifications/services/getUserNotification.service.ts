import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationGateway } from '../gateway/notification.gateway';
import { CreateNotificationDto } from '../dtos/createNotification.dto';
import { errorResponse, successResponse } from 'src/common/utils/response.util';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { NotificationRepository } from '../repository/notification.repository';

@Injectable()
export class GetUserNotificationService {
    constructor(
        private prisma: PrismaService,
        private gateway: NotificationGateway,
        private readonly authRepo: AuthRepository,
        private readonly notiRepo: NotificationRepository
    ) { }

    async getUserNotifications(userID: number, skip = 0, take = 20) {
        // check UserID 
        const userExist = await this.authRepo.findByID(userID);
        if (!userExist) {
            return errorResponse(400, 'UserID không tồn tại', 'USERID_NOT_FOUND')
        }
        const [notifications, total] = await this.prisma.$transaction([
            this.notiRepo.getUserNotification(userID, skip, take),
            this.notiRepo.countUserNotification(userID),
        ]);
        const data = {
            notifications: notifications,
            meta: {
                total,
                skip,
                take,
                hasMore: take === -1 ? false : skip + notifications.length < total,
            },
        };
        // return await Promise.all(
        //     notifications.map(async (noti) => {
        //         if (noti.senderType === 'USER') {
        //             const user = await this.prisma.user.findUnique({
        //                 where: { id: noti.sender?.id },
        //                 select: { id: true, name: true, avatar: true, roleID: true },
        //             });
        //             return { ...noti, sender: user };
        //         }
        //         if (noti.senderType === 'SHOP') {
        //             const shop = await this.prisma.shop.findUnique({
        //                 where: { id: noti.senderID },
        //                 select: { id: true, name: true, logo: true },
        //             });
        //             return { ...noti, sender: shop };
        //         }
        //         return { ...noti, sender: { id: null, name: 'System', avatar: null } };
        //     })
        // );
        return successResponse(200, data, 'Lấy danh sách thông báo thành công ')

    }

}
