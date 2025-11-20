import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { VnpayQueryDto } from '../dtos/vnpay-query.dto';
export declare class PaymentService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    createVnpayUrl(orderId: number, ipAddr: string, req: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    handleVnpayReturn(query: VnpayQueryDto, paymentId: number): Promise<any>;
    private formatDate;
}
