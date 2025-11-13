import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";
export declare class GetAllProductByCategoryGlobalClientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(params: GetAllProductClientQueryDto, categoryGlobalID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
