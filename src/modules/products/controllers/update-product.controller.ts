import { Body, Controller, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from "multer";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { UpdateProductDto } from "../dtos/update-product.dto";
import { UpdateProductService } from "../services/update-product.service";


@ApiTags(`${resourcesV1.UPDATE_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class UpdateProductController {
    constructor(
        private readonly updateProductService: UpdateProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.UPDATE_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Patch(routesV1.product.getDetailProduct)
    // @ApiBody({ type: UpdateProductDto })
    // @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 10 }]))
    async updateProduct(
        @Param('id') productId: number,
        @Body() dto: UpdateProductDto,
        // @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user,
    ) {
        return this.updateProductService.updateProduct(productId, dto,  user.id);
    }
}
