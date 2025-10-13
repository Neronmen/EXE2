import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetProfileService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    async getProfile(userID: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userID },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phone: true,
                status: true,
                oauthProvider: true,
                Role: { select: { id: true, name: true } },
                SellerProfile: true,
                Address: true,
            },
        });
        if (!user) {
            return errorResponse(400, 'Không tìm thấy user', 'USER_NOT_FOUND')
        }

        return successResponse(200, user, "Lấy profile thành công");
    }
}