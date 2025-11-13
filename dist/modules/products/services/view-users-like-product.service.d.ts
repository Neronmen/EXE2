import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ViewUserLikeProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    viewUserLikeProduct(productId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
