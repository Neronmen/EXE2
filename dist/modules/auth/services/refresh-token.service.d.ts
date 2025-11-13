import { JwtService } from "@nestjs/jwt";
export declare class RefreshService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    refresh(reqUser: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
}
