import { PrismaService } from "src/libs/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { SignUpDto } from "../dtos/signUp.dto";
export declare class SignUpService {
    private readonly prisma;
    private readonly jwtService;
    private readonly authRepository;
    constructor(prisma: PrismaService, jwtService: JwtService, authRepository: AuthRepository);
    signup(dto: SignUpDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
