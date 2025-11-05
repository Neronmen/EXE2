import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetDetailCategoryShopClientService } from "../services/getCategoryShop.service";


@ApiTags(
    `${resourcesV1.GET_DETAIL_CATEGORY_SHOP_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetCategoryShopClientController {
    constructor(
        private readonly getDetailCategoryShopClientService: GetDetailCategoryShopClientService,
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_DETAIL_CATEGORY_SHOP_CLIENT.displayName })
    @Get(routesV1.shop.getDetailCategoryShopListClient)
    async getDetailCategoryShopClient(@Param('categoryID', ParseIntPipe) categoryID: number, @Param('slug') slug: string) {
        return this.getDetailCategoryShopClientService.getDetailCategoryShopBySlug(+categoryID, slug);
    }
}