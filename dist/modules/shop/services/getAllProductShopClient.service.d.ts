import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";
export declare class GetAllProductShopClientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(params: GetAllProductClientQueryDto, slug: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
