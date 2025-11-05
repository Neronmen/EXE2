import { Body, Controller, Delete, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from "multer";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeleteProductService } from "../services/delete-product.service";


@ApiTags(`${resourcesV1.DELETE_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class DeleteProductController {
    constructor(
        private readonly deleteProductService: DeleteProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.DELETE_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Delete(routesV1.product.getDetailProduct)
    async delete(
        @Param('id') id: number,
        @GetUser() user,
    ) {
        return this.deleteProductService.deleteProduct(+id, user);
    }
}
