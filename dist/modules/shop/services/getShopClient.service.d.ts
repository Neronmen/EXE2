import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetShopClientService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getShopBySlug(slug: string, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
