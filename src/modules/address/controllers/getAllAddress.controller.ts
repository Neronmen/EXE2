import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllAddressService } from "../services/getAllAddress.service";

@ApiTags(
    `${resourcesV1.GET_ALL_ADDRESS.parent}`,
)
@Controller(routesV1.apiversion)
export class GetAllAddressController {
    constructor(
        private readonly getAllAddressService: GetAllAddressService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_ADDRESS.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Get(routesV1.adddress.root)
    async findAll(@GetUser() user) {
        return await this.getAllAddressService.findAllAddress(user)

    }
}