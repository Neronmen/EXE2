import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetProfileRegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    async getProfileRegister(user) {
        const userID = user.id;
        const sellerProfile = await this.prisma.sellerProfile.findUnique({
            where: {
                userID
            },
            select: {
                id: true,
                userID: true,
                companyName: true,
                slug: true,
                brandName: true,
                businessPhone: true,
                businessAddress: true,
                description: true,
                status: true,
                rejectionReason: true,
                SellerKycDocument: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                    },
                }
            }
        })
        if (!sellerProfile) {
            return errorResponse(400, 'Không tìm thấy hồ sơ đăng ký')
        }

        return successResponse(200, sellerProfile, 'Lấy thông tin hồ sơ đăng ký thành công')
    }
}