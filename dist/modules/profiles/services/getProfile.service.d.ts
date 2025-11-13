import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class GetProfileService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getProfile(userID: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
