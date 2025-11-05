import { Body, Controller, Delete, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from "multer";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { UploadProductImagesDto } from "../dtos/add-product-image.dto";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { AddImageProductService } from "../services/add-new-image-product.service";
import { DeleteImageProductService } from "../services/delete-image-product.service";


@ApiTags(`${resourcesV1.DELETE_IMAGE_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class DeleteImageProductController {
    constructor(
        private readonly deleteImageProductService: DeleteImageProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.DELETE_IMAGE_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Delete(routesV1.product.deleteImage)
    async deleteProduct(
        @Param('id') id: number,
        @Param("imageId") imageId: number,
        @GetUser() user,
    ) {
        return this.deleteImageProductService.deleteImage(id, imageId, user);
    }
}
