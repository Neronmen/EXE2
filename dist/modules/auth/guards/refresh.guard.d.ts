import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
export declare class RefreshGuard implements CanActivate {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractRefreshTokenFromHeader;
}
