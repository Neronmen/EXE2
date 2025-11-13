import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetDetailCategoryShopClientService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getStockStatus(stock: number): "out_of_stock" | "low_stock" | "in_stock";
    getDetailCategoryShopBySlug(categoryID: number, slug: string): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
