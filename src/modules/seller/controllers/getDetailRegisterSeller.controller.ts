import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { PermissionGuard } from "src/modules/auth/guards/permissions.guard";
import { Permissions } from "src/modules/auth/guards/permission.decorator";
import { GetDetailSellersRegisterSellerService } from "../services/getDetailRegisterSeller.service";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";

@ApiTags(
    `${resourcesV1.GET_DETAIL_SELLERS_REGISTER_SELLER.parent}`,
)
@Controller(routesV1.apiversion)
export class GetDetailProfileRegisterSellerController {
    constructor(
        private readonly GetDetailSellersRegisterSellerService: GetDetailSellersRegisterSellerService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_DETAIL_SELLERS_REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2)
    @Get(routesV1.seller.getDetailSellersRegisterSeller)
    async getDetailProfileRegister(@Param('id') sellerID: string) {
        return await this.GetDetailSellersRegisterSellerService.getDetailSellersRegisterSeller(Number(sellerID))
    }
}