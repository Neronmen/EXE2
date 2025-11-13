import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetListCategoryShopService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getListCategoryShop(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
