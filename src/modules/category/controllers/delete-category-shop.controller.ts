import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeleteCategoryShopService } from "../services/delete-category-shop.service";


@ApiTags(
    `${resourcesV1.DELETE_CATEGORY_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class DeleteCategoryShopController {
    constructor(
        private readonly deleteCategoryShopService: DeleteCategoryShopService,
    ) { }

    @ApiOperation({ summary: resourcesV1.DELETE_CATEGORY_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Delete(routesV1.categoryShop.getOne)
    async DeleteCategoryShop(@Param("id") id: string, @GetUser() user) {
        return this.deleteCategoryShopService.deleteCategoryShop(+id, user);
    }
}