import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAllProductClientQueryDto } from "../dtos/get-all-product.client.query";
import { GetAllProductByCategoryGlobalClientService } from "../services/getAllProductByCategoryGlobal.service";


@ApiTags(
    `${resourcesV1.GET_ALL_PRODUCT_BY_CATEGORY_GLOBAL_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetAllProductByCategoryGlobalClientController {
    constructor(
        private readonly getAllProductByCategoryGlobalClientService: GetAllProductByCategoryGlobalClientService,
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_PRODUCT_BY_CATEGORY_GLOBAL_CLIENT.displayName })
    @Get(routesV1.shop.getAllProductCategoryGlobalClient)
    async getAllProductShopClient(@Query() query: GetAllProductClientQueryDto, @Param('id', ParseIntPipe) id: number) {
        return this.getAllProductByCategoryGlobalClientService.getAll(query, id);
    }
}