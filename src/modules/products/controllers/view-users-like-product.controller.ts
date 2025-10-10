import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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
import { ViewUserLikeProductService } from "../services/view-users-like-product.service";


@ApiTags(`${resourcesV1.VIEW_USERS_LIKE_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class ViewUsersLikeProductProductController {
    constructor(
        private readonly viewUserLikeProductService: ViewUserLikeProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.VIEW_USERS_LIKE_PRODUCT.displayName })
    @ApiBearerAuth()
    @Get(routesV1.product.viewUsersLikeProduct)
    async viewLikes(
        @Param('id') id: number,
    ) {
        return this.viewUserLikeProductService.viewUserLikeProduct(Number(id));
    }
}
