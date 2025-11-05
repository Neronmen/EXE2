import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class ShopFollowerService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async followShop(sellerID: number, userID: number) {
        const shop = await this.prisma.sellerProfile.findUnique({ where: { id: sellerID } });
        if (!shop) {
            return errorResponse(404, "Không tìm thấy cửa hàng", "SHOP_NOT_FOUND");
        }

        if (shop.userID === userID) {
            return errorResponse(400, "Bạn không thể theo dõi chính cửa hàng của mình", "CANNOT_FOLLOW_OWN_SHOP");
        }
        const existing = await this.prisma.shopFollower.findUnique({
            where: { userID_sellerID: { userID, sellerID } },
        });
        if (existing) {
            return errorResponse(400, "Bạn đã theo dõi cửa hàng này rồi", "ALREADY_FOLLOWED");
        }

        await this.prisma.$transaction([
            this.prisma.shopFollower.create({
                data: {
                    userID,
                    sellerID
                }
            }),
            this.prisma.sellerProfile.update({
                where: { id: sellerID },
                data: { totalFollowers: { increment: 1 } },
            })
        ]);

        return successResponse(200, "Theo dõi cửa hàng thành công");
    }

}