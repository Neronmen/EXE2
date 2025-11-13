import { PrismaService } from "src/libs/prisma/prisma.service";
import { NotificationGateway } from "src/modules/notifications/gateway/notification.gateway";
export declare class ApproveRegisterSellerService {
    private readonly prisma;
    private gateway;
    constructor(prisma: PrismaService, gateway: NotificationGateway);
    approveRegister(sellerID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
