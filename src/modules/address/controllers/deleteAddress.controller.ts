import { Body, Controller, Delete, Param, Put, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateAddressDto } from "../dtos/update-address.dto";
import { UpdateAddressService } from "../services/updateAddress.service";
import { DeleteAddressService } from "../services/deleteAddress.service";

@ApiTags(
    `${resourcesV1.DELETE_ADDRESS.parent}`,
)
@Controller(routesV1.apiversion)
export class DeleteAddressController {
    constructor(
        private readonly DeleteAddressService: DeleteAddressService
    ) { }
    @ApiOperation({ summary: resourcesV1.DELETE_ADDRESS.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Delete(routesV1.adddress.getOne)
    async Delete(@Param('id') id: string, @GetUser() user) {
        return await this.DeleteAddressService.delete(Number(id), user)
    }
}