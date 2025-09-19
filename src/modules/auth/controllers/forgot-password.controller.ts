import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
import { ForgotPasswordService } from "../services/forgot-password.service";

@ApiTags(
    `${resourcesV1.FORGOT_PASWORD.parent}`,
)
@Controller(routesV1.apiversion)
export class ForgotPasswordController {
    constructor(
        private readonly forgotPasswordService: ForgotPasswordService
    ) { }
    @ApiOperation({ summary: resourcesV1.FORGOT_PASWORD.displayName })
    @Post(routesV1.auth.forgotPassword)
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        return await this.forgotPasswordService.forgotPassword(dto.email)
    }
}