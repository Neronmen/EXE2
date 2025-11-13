import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetProfileRegisterSellerService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getProfileRegister(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
