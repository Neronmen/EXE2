import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";
import { GetAllProductShopClientService } from "../services/getAllProductShopClient.service";


@ApiTags(
    `${resourcesV1.GET_ALL_PRODUCT_SHOP_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetAllProductShopClientController {
    constructor(
        private readonly getAllProductShopClientService: GetAllProductShopClientService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_PRODUCT_SHOP_CLIENT.displayName })
    @Get(routesV1.shop.getAllProductShopClient)
    async getAllProductShopClient(@Query() query: GetAllProductClientQueryDto, @Param('slug') slug: string) {
        return this.getAllProductShopClientService.getAll(query, slug);
    }
}