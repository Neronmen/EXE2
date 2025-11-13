import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ChangeStatusProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    toggleStatus(productId: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
