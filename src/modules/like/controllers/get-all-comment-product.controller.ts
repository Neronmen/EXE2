import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';
import { CreateProductCommentDto } from "../dtos/create-product-comment.dto";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { CreateProductCommentService } from "../services/create-comment-product.service";
import { GetAllCommentProductClientQueryDto } from "../dtos/get-alproduct-comment.dto";
import { GetAllCommentService } from "../services/get-all-comment-product.service";


@ApiTags(
    `${resourcesV1.GET_ALL_COMMENT_PRODUCT.parent}`,
)
@Controller(routesV1.apiversion)
export class GetAllCommentController {
    constructor(
        private readonly getAllCommentService: GetAllCommentService,
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_ALL_COMMENT_PRODUCT.displayName })
    @ApiBearerAuth()
    @Get(routesV1.comment.getOne)
    async getAllComment(
        @Param('id') productId: number,
        @Query() query: GetAllCommentProductClientQueryDto,
    ) {
        return this.getAllCommentService.getAll(productId, query);
    }
}