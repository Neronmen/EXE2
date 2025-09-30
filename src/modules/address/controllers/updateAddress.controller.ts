import { Body, Controller, Param, Put, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { UpdateAddressDto } from "../dtos/update-address.dto";
import { UpdateAddressService } from "../services/updateAddress.service";

@ApiTags(
    `${resourcesV1.UPDATE_ADDRESS.parent}`,
)
@Controller(routesV1.apiversion)
export class UpdateAddressController {
    constructor(
        private readonly UpdateAddressService: UpdateAddressService
    ) { }
    @ApiOperation({ summary: resourcesV1.UPDATE_ADDRESS.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Put(routesV1.adddress.getOne)
    async update(@Param('id') id: string, @Body() data: UpdateAddressDto, @GetUser() user) {
        return await this.UpdateAddressService.update(Number(id), data, user)
    }
}