import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationRepository } from '../repository/notification.repository';
export declare class ReadAllNotificationService {
    private prisma;
    private readonly repository;
    constructor(prisma: PrismaService, repository: NotificationRepository);
    readAllNotification(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
