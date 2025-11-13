import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ShopReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    getShopReviews(sellerID: number, pagination: {
        page: number;
        limit: number;
    }): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
