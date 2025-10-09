import { Body, Controller, Get, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from "multer";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { CreateProductDto } from "../dtos/create-product.dto";
import { CreateProductService } from "../services/create-product.service";
import { GetAllProductService } from "../services/get-all-product.service";
import { GetAllProductQueryDto } from "../dtos/get-all-product.query";


@ApiTags(`${resourcesV1.GET_ALL_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class GetAllProductController {
    constructor(
        private readonly getAllProductService: GetAllProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Get(routesV1.product.createProduct)
    async getAllProduct(
        @Query() query: GetAllProductQueryDto, @GetUser() user
    ) {
        console.log(query)
        return this.getAllProductService.getAll(query, user);
    }
}
