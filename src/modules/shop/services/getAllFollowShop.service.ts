import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { ResubmitSellerDto } from "src/modules/seller/dtos/resubmit-seller.dto";


@Injectable()
export class ListShopFollowerService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }
    async getFollowers(shopID: number) {
        const followers = await this.prisma.shopFollower.findMany({
            where: { sellerID: shopID },
            select: {
                id: true,
                user: {
                    select: { id: true, name: true, avatar: true, email: true, phone: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return successResponse(200, followers, "Lấy danh sách người theo dõi thành công");
    }


}