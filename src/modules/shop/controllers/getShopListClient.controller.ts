import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetShopListClientService } from "../services/getShopListClient.service";
import { GetShopClientDto } from "../dtos/get-shop-client.dto";

@ApiTags(
    `${resourcesV1.GET_SHOP_LIST_CLIENT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetShopListClientController {
    constructor(
        private readonly GetShopListClientService: GetShopListClientService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_SHOP_LIST_CLIENT.displayName })
    @Get(routesV1.shop.getShopListClient)
    async getShopClient(@Query() dto: GetShopClientDto) {
        return await this.GetShopListClientService.getShopList(dto)
    }
}