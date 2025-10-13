import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { log } from "console";
import { ChangePassProfileDto } from "../dtos/changePassProfile.dto";
import { ChangePassProfileService } from "../services/changePassProfile.service";
import { ChangeEmailService } from "../services/changeEmail.service";


@ApiTags(
    `${resourcesV1.CHANGE_EMAIL_PROFILE.parent}`,
)
@Controller(routesV1.apiversion)
export class ChangeEmailProfileController {
    constructor(
        private readonly ChangeEmailService: ChangeEmailService
    ) { }

    @ApiOperation({ summary: resourcesV1.CHANGE_EMAIL_PROFILE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Get(routesV1.profile.changeEmailProfile)
    async changeEmail(@GetUser() user) {
        return await this.ChangeEmailService.changeEmail(user)
    }
}