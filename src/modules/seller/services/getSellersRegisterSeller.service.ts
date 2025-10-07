import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetSellersRegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }
    async getSellersRegisterSeller(status?: "PENDING" | "APPROVED" | "REJECTED") {
        const records = await this.prisma.sellerProfile.findMany({
            where: status ? { status } : {},
            select: {
                id: true,
                companyName: true,
                brandName: true,
                slug: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        phone: true,
                    }
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return successResponse(200, records, 'Lấy danh sách đơn đăng ký thành công')

    }
}