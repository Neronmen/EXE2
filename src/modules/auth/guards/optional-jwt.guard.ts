import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class OptionalJWTGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            request.user = null;
            return true;
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_KEY,
            });

            const user = await this.prisma.user.findUnique({
                where: { id: payload.id },
            });

            if (!user || user.isDeleted) {
                request.user = null;
                return true;
            }

            request.user = { ...payload, roleID: user.roleID };
        } catch {
            request.user = null;
        }

        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
