import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetSellersRegisterSellerService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getSellersRegisterSeller(status?: "PENDING" | "APPROVED" | "REJECTED"): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
