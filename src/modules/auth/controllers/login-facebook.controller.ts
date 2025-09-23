import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginFacebookDto } from "../dtos/login-facebook.dto";
import { LoginFacebookService } from "../services/login-facebook.service";


@ApiTags(
    `${resourcesV1.LOGIN_FACEBOOK.parent}`,
)
@Controller(routesV1.apiversion)
export class LoginFacebookController {
    constructor(
        private readonly LoginFacebookService: LoginFacebookService
    ) { }
    @ApiOperation({ summary: resourcesV1.LOGIN_FACEBOOK.displayName })
    @Post(routesV1.auth.login_facebook)
    async loginFacebook(@Body() data: LoginFacebookDto) {
        return await this.LoginFacebookService.loginFaceBook(data)
    }
}