import { PrismaService } from "src/libs/prisma/prisma.service";
import { NotificationGateway } from "src/modules/notifications/gateway/notification.gateway";
import { RejectRegisterSellersDto } from "../dtos/reject-register-seller.dto";
export declare class RejectRegisterSellerService {
    private readonly prisma;
    private gateway;
    constructor(prisma: PrismaService, gateway: NotificationGateway);
    rejectRegister(sellerID: number, dto: RejectRegisterSellersDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
