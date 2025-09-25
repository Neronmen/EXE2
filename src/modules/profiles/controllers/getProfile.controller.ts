import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetProfileService } from "../services/getProfile.service";

@ApiTags(
    `${resourcesV1.GET_PROFILE.parent}`,
)
@Controller(routesV1.apiversion)
export class GetProfileController {
    constructor(
        private readonly getProfileService: GetProfileService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_PROFILE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Get(routesV1.profile.root)
    async getProfile(@GetUser() user) {
        return await this.getProfileService.getProfile(Number(user.id))
    }
}