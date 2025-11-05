import { Controller, Get, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetProfileRegisterSellerService } from "../services/getProfileRegisterSeller.service";

@ApiTags(
    `${resourcesV1.GET_PROFILE_REGISTER_SELLER.parent}`,
)
@Controller(routesV1.apiversion)
export class GetProfileRegisterSellerController {
    constructor(
        private readonly GetProfileRegisterSellerService: GetProfileRegisterSellerService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_PROFILE_REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4, 6)
    @Get(routesV1.seller.getRegisterSeller)
    async getProfileRegister(@GetUser() user) {
        return await this.GetProfileRegisterSellerService.getProfileRegister(user)
    }
}