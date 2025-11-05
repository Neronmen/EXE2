import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResetEmailDto } from "../dtos/reset-email.dto";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ResetPasswordService } from "../services/resetEmail.service";

@ApiTags(
    `${resourcesV1.RESET_EMAIL.parent}`,
)
@Controller(routesV1.apiversion)
export class ResetEmailController {
    constructor(
        private readonly ResetPasswordService: ResetPasswordService
    ) { }
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @ApiOperation({ summary: resourcesV1.RESET_EMAIL.displayName })
    @Post(routesV1.profile.resetEmail)
    async resetEmail(@Body() dto: ResetEmailDto, @GetUser() user) {
        return await this.ResetPasswordService.resetEmail(dto.email, user)
    }
}