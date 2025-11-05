import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { PermissionGuard } from "src/modules/auth/guards/permissions.guard";
import { Permissions } from "src/modules/auth/guards/permission.decorator";
import { ApproveRegisterSellerService } from "../services/approveRegisterSeller.service";
import { RejectRegisterSellersDto } from "../dtos/reject-register-seller.dto";
import { RejectRegisterSellerService } from "../services/rejectRegisterSeller.service";

@ApiTags(
    `${resourcesV1.REJECT__REGISTER_SELLER.parent}`,
)
@Controller(routesV1.apiversion)
export class RejectRegisterSellerController {
    constructor(
        private readonly RejectRegisterSellerService: RejectRegisterSellerService
    ) { }
    @ApiOperation({ summary: resourcesV1.REJECT__REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, PermissionGuard)
    @Permissions("REJECT_SELLER_REGISTER")
    @Patch(routesV1.seller.rejectRegisterSeller)
    async rejectRegister(@Param('id') sellerID: string, @Body() dto: RejectRegisterSellersDto) {
        return await this.RejectRegisterSellerService.rejectRegister(Number(sellerID), dto)
    }
}