import { PrismaService } from 'src/libs/prisma/prisma.service';
import { NotificationGateway } from '../gateway/notification.gateway';
import { CreateNotificationDto } from '../dtos/createNotification.dto';
import { NotificationRepository } from '../repository/notification.repository';
export declare class CreateNotificationService {
    private prisma;
    private gateway;
    private readonly repository;
    constructor(prisma: PrismaService, gateway: NotificationGateway, repository: NotificationRepository);
    createNotification(data: CreateNotificationDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
