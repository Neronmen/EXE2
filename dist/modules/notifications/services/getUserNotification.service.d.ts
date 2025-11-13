import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationGateway } from '../gateway/notification.gateway';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { NotificationRepository } from '../repository/notification.repository';
export declare class GetUserNotificationService {
    private prisma;
    private gateway;
    private readonly authRepo;
    private readonly notiRepo;
    constructor(prisma: PrismaService, gateway: NotificationGateway, authRepo: AuthRepository, notiRepo: NotificationRepository);
    getUserNotifications(userID: number, skip?: number, take?: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
