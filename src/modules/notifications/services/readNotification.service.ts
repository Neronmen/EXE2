import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationGateway } from '../gateway/notification.gateway';
import { errorResponse, successResponse } from 'src/common/utils/response.util';
import { NotificationRepository } from '../repository/notification.repository';

@Injectable()
export class ReadNotificationService {
    constructor(
        private prisma: PrismaService,
        private readonly repository: NotificationRepository,

    ) { }

    async readNotification(notificationID: number, user) {
        try {
            const userID = user.id;
            const checkNoti = await this.repository.findNotificationByID(notificationID)
            if (!checkNoti) {
                return errorResponse(400, 'Thông báo không tồn tại', 'NOTI_NOT_FOUND')
            }
            if (checkNoti.receiverID !== userID) {
                return errorResponse(400, 'Thông báo không phải của bạn', 'NOT_PERMISSION_NOTI')
            }
            this.repository.updateIsReadNotification(notificationID)
            return successResponse(200, 'Đánh dấu đã xem thông báo thành công');
        } catch (error) {
            console.log(error)
            return errorResponse(400, error, 'Đánh dấu đã xem thông báo không thành công');

        }
    }


}
