import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { errorResponse, successResponse } from 'src/common/utils/response.util';
import { NotificationRepository } from '../repository/notification.repository';

@Injectable()
export class ReadAllNotificationService {
    constructor(
        private prisma: PrismaService,
        private readonly repository: NotificationRepository,

    ) { }

    async readAllNotification(user) {
        const userID = user.id;
        const notifications = await this.repository.findAllNotificationByUserID(userID);
        if (notifications.length === 0) {
            return errorResponse(400, 'Không có thông báo nào để đánh dấu đã đọc', 'NO_NOTIFICATIONS');
        }
        await this.repository.updateManyIsReadNotificationByUserID(userID);
        return successResponse(200, 'Đánh dấu đã xem tất cả thông báo thành công');

    }


}
