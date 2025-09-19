import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { ResetPasswordService } from "../services/reset-password.service";

@ApiTags(
    `${resourcesV1.RESET_PASSWORD.parent}`,
)
@Controller(routesV1.apiversion)
export class ResetPasswordController {
    constructor(
        private readonly ResetPasswordService: ResetPasswordService
    ) { }
    @ApiOperation({ summary: resourcesV1.RESET_PASSWORD.displayName })
    @Post(routesV1.auth.resetPassword)
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return await this.ResetPasswordService.resetPassword(dto.email, dto.newPassword)
    }
}