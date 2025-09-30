import { Body, Controller, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateAddressDto } from "../dtos/update-address.dto";
import { UpdateAddressService } from "../services/updateAddress.service";
import { SetDefaultAddressService } from "../services/setDefaultAddress.service";

@ApiTags(
    `${resourcesV1.SET_DEFAULT_ADDRESS.parent}`,
)
@Controller(routesV1.apiversion)
export class SetDefaultAddressController {
    constructor(
        private readonly setDefaultAddressService: SetDefaultAddressService
    ) { }
    @ApiOperation({ summary: resourcesV1.SET_DEFAULT_ADDRESS.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Patch(routesV1.adddress.setDefaultAddress)
    async setDefault(@Param('id') id: string, @GetUser() user) {
        return await this.setDefaultAddressService.setDefault(Number(id), user)
    }
}