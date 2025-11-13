import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class UnFollowerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    unfollowShop(sellerID: number, userID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
