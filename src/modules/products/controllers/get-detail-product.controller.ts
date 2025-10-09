import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { SellerProductService } from "../services/get-detail-product.service";


@ApiTags(`${resourcesV1.GET_DETAIL_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class GetDetailProductController {
    constructor(private readonly productService: SellerProductService) { }

    @ApiOperation({ summary: resourcesV1.GET_DETAIL_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.product.getDetailProduct)
    async getDetailProduct(
        @Param('id') id: number, @GetUser() user
    ) {
        return this.productService.getProductDetail(+id, user.id);

    }
}
