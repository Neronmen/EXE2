import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetDetailSellersRegisterSellerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDetailSellersRegisterSeller(sellerID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
