import { PrismaService } from "src/libs/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginFacebookDto } from "../dtos/login-facebook.dto";
export declare class LoginFacebookService {
    private readonly prisma;
    private readonly jwtService;
    private readonly authRepository;
    constructor(prisma: PrismaService, jwtService: JwtService, authRepository: AuthRepository);
    private getUserPermissions;
    loginFaceBook(body: LoginFacebookDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
