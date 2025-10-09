import { Body, Controller, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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


@ApiTags(`${resourcesV1.CREATE_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class CreateProductController {
    constructor(
        private readonly createProductService: CreateProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.CREATE_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Post(routesV1.product.createProduct)
    @ApiBody({ type: CreateProductDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
    async createProduct(
        @Body() dto: CreateProductDto,
        @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user,
    ) {
        return this.createProductService.create(dto, files.images, user);
    }
}
