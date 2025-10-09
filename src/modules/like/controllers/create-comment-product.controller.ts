import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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


@ApiTags(
    `${resourcesV1.CREATE_COMMENT_PRODUCT.parent}`,
)
@Controller(routesV1.apiversion)
export class CreateCommentController {
    constructor(
        private readonly createCommentService: CreateProductCommentService,
    ) { }
    @ApiOperation({ summary: resourcesV1.CREATE_COMMENT_PRODUCT.displayName })
    @UseGuards(JWTGuard)
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]),
    )
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                content: { type: 'string' },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    })
    @Post(routesV1.comment.getOne)
    async createShopReview(
        @Param('id') productId: number,
        @Body() dto: CreateProductCommentDto,
        @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user,
    ) {
        return await this.createCommentService.createComment(+productId, dto, Number(user.id), files);
    }
}