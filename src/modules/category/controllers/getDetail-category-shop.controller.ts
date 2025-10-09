import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailCategoryShopService } from "../services/getDetail-category-shop.service";


@ApiTags(
    `${resourcesV1.GET_DETAIL_CATEGORY_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class GetDetailCategoryShopController {
    constructor(
        private readonly getDetailCategoryShopService: GetDetailCategoryShopService,
    ) { }

    @ApiOperation({ summary: resourcesV1.GET_DETAIL_CATEGORY_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.categoryShop.getOne)
    async getDetailCategoryShop(@Param('id') id: number, @GetUser() user) {
        return this.getDetailCategoryShopService.getDetailCategoryShop(+id, user);
    }
}