import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class DeleteCategoryShopService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async deleteCategoryShop(id: number, user) {

        const existing = await this.prisma.categoryShop.findUnique({ where: { id } });
        if (!existing) {
            return errorResponse(404, "Không tìm thấy danh mục", "NOT_FOUND");
        }
        const seller = await this.prisma.sellerProfile.findUnique({
            where: { userID: user.id },
        });
        if (existing.sellerID !== seller?.id) {
            return errorResponse(400, "Bạn không có quyền xóa danh mục", "FORBIDDEN");
        }

        const productExist = await this.prisma.product.findFirst({
            where: { categoryShopID: id },
        });
        if (productExist) {
            return errorResponse(400, "Không thể xóa danh mục vì vẫn có sản phẩm", "CATEGORY_IN_USE");
        }

        await this.prisma.categoryShop.delete({ where: { id } });
        return successResponse(200, null, "Xóa danh mục thành công");
    }
}
