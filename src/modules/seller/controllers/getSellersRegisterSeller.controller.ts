import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { PermissionGuard } from "src/modules/auth/guards/permissions.guard";
import { Permissions } from "src/modules/auth/guards/permission.decorator";
import { GetSellersRegisterSellerService } from "../services/getSellersRegisterSeller.service";
import { GetAllSellersDto } from "../dtos/get-sellers-register-seller.dto";

@ApiTags(
    `${resourcesV1.GET_SELLERS_REGISTER_SELLER.parent}`,
)
@Controller(routesV1.apiversion)
export class GetSellersRegisterSellerController {
    constructor(
        private readonly GetSellersRegisterSellerService: GetSellersRegisterSellerService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_SELLERS_REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, PermissionGuard)
    @Permissions("GET_ALL_SELLERS_REGISTER")
    @Get(routesV1.seller.getSellersRegisterSeller)
    async getSellersRegisterSeller(@Query() query: GetAllSellersDto) {
        const { status } = query;
        return await this.GetSellersRegisterSellerService.getSellersRegisterSeller(status)
    }
}