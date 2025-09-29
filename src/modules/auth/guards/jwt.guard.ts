import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class JWTGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_KEY,
            });

            // check user trong DB
            const user = await this.prisma.user.findUnique({
                where: { id: payload.id },
            });

            if (!user || user.isDeleted) {
                throw new ForbiddenException("Tài khoản đã bị khóa hoặc xóa");
            }
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true
    }


    private extractTokenFromHeader(request: Request) {
        const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
        return (type === "Bearer") ? token : undefined
    }
}