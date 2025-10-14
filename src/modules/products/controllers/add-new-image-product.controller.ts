import { Body, Controller, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
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
import { errorResponse } from "src/common/utils/response.util";


@ApiTags(`${resourcesV1.ADD_IMAGE_PRODUCT.parent}`)
@Controller(routesV1.apiversion)
export class AddImageProductController {
    constructor(
        private readonly AddImageProductService: AddImageProductService
    ) { }
    @ApiOperation({ summary: resourcesV1.ADD_IMAGE_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Post(routesV1.product.addNewImage)
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'images', maxCount: 10 }])
    )
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    description: 'Danh sách ảnh cần upload',
                },
            },
            required: ['images']
        },
    })
    @ApiParam({ name: 'id', description: 'ID của sản phẩm' })
    @ApiConsumes('multipart/form-data')
    async createProduct(
        @Param('id') id: number,
        @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user, @Req() req,
    ) {
        const contentType = req.headers['content-type'] || '';
        if (!contentType.includes('multipart/form-data')) {
            return errorResponse(400, 'Yêu cầu này cần có Content-Type: multipart/form-data. Vui lòng gửi file đúng định dạng.');
        }
        return await this.AddImageProductService.addImage(+id, files, user)
    }
}
