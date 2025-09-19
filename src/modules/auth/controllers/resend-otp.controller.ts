import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { ResetPasswordService } from "../services/reset-password.service";
import { ResendOTPDTO } from "../dtos/resend-otp.dto";
import { ResendOTPService } from "../services/resend-otp.service";

@ApiTags(
    `${resourcesV1.RESEND_OTP.parent}`,
)
@Controller(routesV1.apiversion)
export class ResendOTPController {
    constructor(
        private readonly ResendOTPService: ResendOTPService
    ) { }
    @ApiOperation({ summary: resourcesV1.RESEND_OTP.displayName })
    @Post(routesV1.auth.resendOTP)
    async resendOTP(@Body() dto: ResendOTPDTO) {
        return await this.ResendOTPService.resendOTP(dto.email)
    }
}