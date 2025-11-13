import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ShopFollowerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    followShop(sellerID: number, userID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
