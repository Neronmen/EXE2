import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { VerifyOtpEmailDto } from "../dtos/verify-otp-email.dto";
import { VerifyOtpEmailService } from "../services/verify-otp-email.service";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";

@ApiTags(
    `${resourcesV1.VERIFY_OTP_EMAIL.parent}`,
)
@Controller(routesV1.apiversion)
export class VerifyOtpEmailController {
    constructor(
        private readonly VerifyOtpEmailService: VerifyOtpEmailService
    ) { }
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @ApiOperation({ summary: resourcesV1.VERIFY_OTP_EMAIL.displayName })
    @Post(routesV1.profile.veifyOTPEmail)
    async verifyOtp(@Body() dto: VerifyOtpEmailDto, @GetUser() user) {
        return await this.VerifyOtpEmailService.verifyOtp(user, dto.otp)
    }
}