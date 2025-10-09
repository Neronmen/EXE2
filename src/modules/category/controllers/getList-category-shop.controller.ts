import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetListCategoryShopService } from "../services/getList-category-shop.service";


@ApiTags(
    `${resourcesV1.GET_LIST_CATEGORY_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class GetListCategoryShopController {
    constructor(
        private readonly getListCategoryShopService: GetListCategoryShopService,
    ) { }

    @ApiOperation({ summary: resourcesV1.GET_LIST_CATEGORY_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.categoryShop.root)
    async getListCategoryShop(@GetUser() user) {
        return this.getListCategoryShopService.getListCategoryShop(user);
    }
}