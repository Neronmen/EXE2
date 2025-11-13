import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationRepository } from '../repository/notification.repository';
export declare class ReadNotificationService {
    private prisma;
    private readonly repository;
    constructor(prisma: PrismaService, repository: NotificationRepository);
    readNotification(notificationID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
