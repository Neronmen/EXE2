import { PrismaService } from 'src/libs/prisma/prisma.service';
export declare class GetAllProductHomePageClientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getStockStatus;
    getAllProductHomePage(): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
