import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { ResendOTPEmailService } from "../services/resend-otp-email.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";

@ApiTags(
    `${resourcesV1.RESEND_OTP_EMAIL.parent}`,
)
@Controller(routesV1.apiversion)
export class ResendOTPEmailController {
    constructor(
        private readonly ResendOTPEmailService: ResendOTPEmailService
    ) { }
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @ApiOperation({ summary: resourcesV1.RESEND_OTP_EMAIL.displayName })
    @Post(routesV1.profile.resendOTPEmail)
    async resendOTPEmail(@GetUser() user) {
        return await this.ResendOTPEmailService.resendOTPEmail(user)
    }
}