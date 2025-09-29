import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { GetAllAddressService } from "../services/getAllAddress.service";
import { CreateAddressDto } from "../dtos/create-address.dto";
import { CreateAddressService } from "../services/createAddress.service";

@ApiTags(
    `${resourcesV1.CREATE_ADDRESS.parent}`,
)
@Controller(routesV1.apiversion)
export class CreateAddressController {
    constructor(
        private readonly CreateAddressService: CreateAddressService
    ) { }
    @ApiOperation({ summary: resourcesV1.CREATE_ADDRESS.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Post(routesV1.adddress.root)
    async create(@Body() data: CreateAddressDto, @GetUser() user) {
        return await this.CreateAddressService.create(data, user)
    }
}