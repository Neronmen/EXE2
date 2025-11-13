import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class DeleteCategoryShopService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deleteCategoryShop(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
