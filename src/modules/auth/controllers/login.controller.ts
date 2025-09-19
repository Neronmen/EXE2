import { Body, Controller, Post } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dtos/login.dto";
import { LoginService } from "../services/login.service";
import { GetUser } from "../guards/get-user.decorator";


@ApiTags(
    `${resourcesV1.LOGIN.parent}`,
)
@Controller(routesV1.apiversion)
export class LoginController {
    constructor(
        private readonly loginService: LoginService
    ) { }
    @ApiOperation({ summary: resourcesV1.LOGIN.displayName })
    @Post(routesV1.auth.login)
    async login(@Body() data: LoginDto) {
        return await this.loginService.login(data)
    }
}