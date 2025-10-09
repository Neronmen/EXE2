import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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
import { DeleteProductCommentService } from "../services/delete-comment-product.service";


@ApiTags(
    `${resourcesV1.DELETE_COMMENT_PRODUCT.parent}`,
)
@Controller(routesV1.apiversion)
export class DeleteCommentController {
    constructor(
        private readonly deleteCommentService: DeleteProductCommentService,
    ) { }
    @ApiOperation({ summary: resourcesV1.DELETE_COMMENT_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4, 6)
    @Delete(routesV1.comment.updateComment)
    async deleteComment(
        @Param('commentId') commentId: number,
        @GetUser() user,
    ) {
        return await this.deleteCommentService.deleteComment(+commentId, user);
    }
}