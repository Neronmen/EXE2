import { Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { PermissionGuard } from "src/modules/auth/guards/permissions.guard";
import { Permissions } from "src/modules/auth/guards/permission.decorator";
import { ApproveRegisterSellerService } from "../services/approveRegisterSeller.service";

@ApiTags(
    `${resourcesV1.APPROVE__REGISTER_SELLER.parent}`,
)
@Controller(routesV1.apiversion)
export class ApproveRegisterSellerController {
    constructor(
        private readonly ApproveRegisterSellerService: ApproveRegisterSellerService
    ) { }
    @ApiOperation({ summary: resourcesV1.APPROVE__REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, PermissionGuard)
    @Permissions("APPROVE_SELLER_REGISTER")
    @Patch(routesV1.seller.approveRegisterSeller)
    async approveRegister(@Param('id') sellerID: string) {
        return await this.ApproveRegisterSellerService.approveRegister(Number(sellerID))
    }
}