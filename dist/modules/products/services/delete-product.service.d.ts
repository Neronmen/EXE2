import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class DeleteProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deleteProduct(productId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
