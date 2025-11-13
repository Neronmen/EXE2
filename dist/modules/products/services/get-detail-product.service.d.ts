import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class SellerProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProductDetail(productId: number, userId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
