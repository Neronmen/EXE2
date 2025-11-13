import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetDetailCategoryShopService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDetailCategoryShop(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
