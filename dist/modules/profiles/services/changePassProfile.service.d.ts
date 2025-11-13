import { JwtService } from "@nestjs/jwt";
import { ChangePassProfileDto } from "../dtos/changePassProfile.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { ChangePassProfileRepository } from "../repositories/changePassProfile.repository";
export declare class ChangePassProfileService {
    private readonly prisma;
    private readonly jwtService;
    private readonly changePassRepo;
    constructor(prisma: PrismaService, jwtService: JwtService, changePassRepo: ChangePassProfileRepository);
    changePassProfile(userID: number, data: ChangePassProfileDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
