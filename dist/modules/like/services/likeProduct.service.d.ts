import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class LikeAndUnlikeProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    likeProduct(productID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
