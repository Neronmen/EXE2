import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetAllProductHomePageClientService } from "../services/getProductHomePage.service";


@ApiTags(
    `${resourcesV1.GET_ALL_PRODUCT_HOMEPAGE_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetAllProductHomePageShopClientController {
    constructor(
        private readonly getAllProductHomePageClientService: GetAllProductHomePageClientService,
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_PRODUCT_HOMEPAGE_CLIENT.displayName })
    @Get(routesV1.shop.getAllProductHomePageClient)
    async getAllProductHomePageShopClient() {
        return this.getAllProductHomePageClientService.getAllProductHomePage();
    }
}