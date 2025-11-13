import { PrismaService } from "src/libs/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../dtos/login.dto";
import { AuthRepository } from "../repositories/auth.repository";
export declare class LoginService {
    private readonly prisma;
    private readonly jwtService;
    private readonly authRepository;
    constructor(prisma: PrismaService, jwtService: JwtService, authRepository: AuthRepository);
    private getUserPermissions;
    login(dto: LoginDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
