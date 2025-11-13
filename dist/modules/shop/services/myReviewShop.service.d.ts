import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class MyShopReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    myReview(sellerID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
