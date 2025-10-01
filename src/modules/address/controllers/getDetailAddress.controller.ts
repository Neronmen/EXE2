import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetDetailAddressService } from "../services/getDetailAddress.service";

@ApiTags(
    `${resourcesV1.GET_DETAIL_ADDRESS.parent}`,
)
@Controller(routesV1.apiversion)
export class GetDetailAddressController {
    constructor(
        private readonly GetDetailAddressService: GetDetailAddressService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_DETAIL_ADDRESS.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Get(routesV1.adddress.getOne)
    async detail(@Param('id') id: string, @GetUser() user) {
        return await this.GetDetailAddressService.getDetailAddress(Number(id), user)
    }
}