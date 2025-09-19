import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { VerifyOtpDto } from "../dtos/verify-otp.dto";
import { VerifyOtpService } from "../services/verify-otp.service";

@ApiTags(
    `${resourcesV1.VERIFY_OTP.parent}`,
)
@Controller(routesV1.apiversion)
export class VerifyOtpController {
    constructor(
        private readonly VerifyOtpService: VerifyOtpService
    ) { }
    @ApiOperation({ summary: resourcesV1.VERIFY_OTP.displayName })
    @Post(routesV1.auth.veifyOTP)
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.VerifyOtpService.verifyOtp(dto.email, dto.otp)
    }
}