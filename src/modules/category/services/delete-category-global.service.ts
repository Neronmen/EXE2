import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";

@Injectable()
export class DeleteCategoryGlobalService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async deleteCategoryGlobal(id: number) {
        const category = await this.prisma.categoryGlobal.findUnique({ where: { id } });
        if (!category) {
            return errorResponse(400, "Danh mục không tồn tại");
        }

        const existProduct = await this.prisma.product.findFirst({
            where: { categoryGlobalID: id },
        });

        if (existProduct) {
            return errorResponse(400, "Không thể xóa vì vẫn còn sản phẩm thuộc danh mục này", "CATEGORY_IN_USE");
        }
        await this.prisma.categoryGlobal.delete({ where: { id } });
        return successResponse(200, null, "Xóa danh mục toàn cục thành công");
    }
}
