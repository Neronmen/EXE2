import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateShopReviewDto } from "../dtos/create-review-shop.dto";
import type { File as MulterFile } from 'multer';
import { CreateShopReviewService } from "../services/createReviewShop.service";


@ApiTags(
    `${resourcesV1.CREATE_REVIEW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class CreateReviewShopController {
    constructor(
        private readonly CreateShopReviewService: CreateShopReviewService
    ) { }
    @ApiOperation({ summary: resourcesV1.CREATE_REVIEW_SHOP.displayName })
    @UseGuards(JWTGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Tạo đánh giá cho shop' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]),
    )
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                sellerID: { type: 'number' },
                rating: { type: 'number', minimum: 1, maximum: 5 },
                comment: { type: 'string' },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    })
    @Post(routesV1.shop.createReviewShop)
    async createShopReview(
        @Body() dto: CreateShopReviewDto,
        @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user,
    ) {
        return this.CreateShopReviewService.createReview(dto, files, user);
    }
}