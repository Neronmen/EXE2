import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";


@Injectable()
export class UnFollowerService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async unfollowShop(sellerID: number, userID: number) {
        const existing = await this.prisma.shopFollower.findUnique({
            where: { userID_sellerID: { userID, sellerID } },
        });
        if (!existing) {
            return errorResponse(400, "Bạn chưa theo dõi cửa hàng này", "NOT_FOLLOWED");
        }
        await this.prisma.shopFollower.delete({
            where: { userID_sellerID: { userID, sellerID } },
        });

        // Giảm tổng follower
        await this.prisma.sellerProfile.update({
            where: { id: sellerID },
            data: { totalFollowers: { decrement: 1 } },
        });

        return successResponse(200,  "Bỏ theo dõi cửa hàng thành công");
    }


}