import { PrismaService } from "src/libs/prisma/prisma.service";
import { GetAllProductQueryDto } from "../dtos/get-all-product.query";
export declare class GetAllProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(params: GetAllProductQueryDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
