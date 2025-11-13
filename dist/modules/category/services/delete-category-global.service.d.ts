import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class DeleteCategoryGlobalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deleteCategoryGlobal(id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
