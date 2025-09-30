import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { log } from "console";
import { ChangePassProfileDto } from "../dtos/changePassProfile.dto";
import { ChangePassProfileService } from "../services/changePassProfile.service";


@ApiTags(
    `${resourcesV1.CHANGE_PASSWORD_PROFILE.parent}`,
)
@Controller(routesV1.apiversion)
export class ChangePassProfileController {
    constructor( private readonly changePassProfileService: ChangePassProfileService 
        
    ) { }
    @ApiOperation({ summary: resourcesV1.CHANGE_PASSWORD_PROFILE.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Patch(routesV1.profile.changePassProfile)
    async changePass(@Param('userID') userID: String, @Body() data: ChangePassProfileDto, @GetUser() user) {
        console.log(userID)
        console.log(data)
        console.log(user)
        return await this.changePassProfileService.changePassProfile(Number(userID),data,user)
    }
}