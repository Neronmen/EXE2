import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "../dtos/signUp.dto";
import { SignUpService } from "../services/signup.service";


@ApiTags(
    `${resourcesV1.SIGNUP.parent}`,
)
@Controller(routesV1.apiversion)
export class SignUpController {
    constructor(
        private readonly SignUpService: SignUpService
    ) { }
    @ApiOperation({ summary: resourcesV1.SIGNUP.displayName })
    @Post(routesV1.auth.signup)
    async signUp(@Body() data: SignUpDto) {
        return await this.SignUpService.signup(data)
    }
}