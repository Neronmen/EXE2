import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetDetailCategoryShopClientService } from "../services/getCategoryShop.service";
import { GetDetailProductShopClientService } from "../services/getDetailProductShop.service";
import { OptionalJWTGuard } from "src/modules/auth/guards/optional-jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";


@ApiTags(
    `${resourcesV1.GET_DETAIL_PRODUCT_SHOP_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetDetailProductShopClientController {
    constructor(
        private readonly GetDetailProductShopClientService: GetDetailProductShopClientService
    ) { }
    @ApiBearerAuth()
    @ApiOperation({ summary: resourcesV1.GET_DETAIL_PRODUCT_SHOP_CLIENT.displayName })
    @UseGuards(OptionalJWTGuard)
    @Get(routesV1.shop.getDetailProductShopClient)
    async getDetailCategoryShopClient(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
        return await this.GetDetailProductShopClientService.getDetailProductShop(+id, user);
    }
}