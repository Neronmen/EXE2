import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class GetDetailSellersRegisterSellerService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getDetailSellersRegisterSeller(sellerID: number) {
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { id: sellerID },
            select: {
                id: true,
                userID: true,
                companyName: true,
                brandName: true,
                businessPhone: true,
                businessAddress: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        phone: true,
                        avatar: true,
                    }
                },
                SellerKycDocument: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                    }
                }
            }
        });

        if (!seller) {
            return errorResponse(400, `Không tìm thấy đơn đăng ký nào có ID ${sellerID}`)
        }
        return successResponse(200, seller, 'Lấy thông tin chi tiết thành công')

    }
}