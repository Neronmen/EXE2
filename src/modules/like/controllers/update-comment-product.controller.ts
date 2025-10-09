import { Body, Controller, Param, Patch, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';
import { UpdateProductCommentDto } from "../dtos/update-product-comment.dto";
import { UpdateProductCommentService } from "../services/update-comment-product.service";

@ApiTags(`${resourcesV1.UPDATE_COMMENT_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class UpdateCommentController {
    constructor(
        private readonly updateCommentService: UpdateProductCommentService,
    ) { }

    @ApiOperation({ summary: resourcesV1.UPDATE_COMMENT_PRODUCT.displayName })
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
                deleteImageIds: {
                    type: 'array',
                    items: { type: 'number' }
                },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    })
    @Patch(routesV1.comment.updateComment)
    async updateComment(
        @Param('commentId') commentId: number,
        @Body() dto: UpdateProductCommentDto,
        @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user,
    ) {
        return await this.updateCommentService.updateComment(+commentId, dto, Number(user.id), files);
    }
}
