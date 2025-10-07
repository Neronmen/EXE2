import {
    Body,
    Controller,
    Patch,
    Param,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from "multer";
import { UpdateShopReviewDto } from "../dtos/update-review-shop.dto";
import { UpdateShopReviewService } from "../services/updateReviewShop.service";

@ApiTags(`${resourcesV1.UPDATE_REVIEW_SHOP.parent}`)
@Controller(routesV1.apiversion)
export class UpdateReviewShopController {
    constructor(
        private readonly UpdateShopReviewService: UpdateShopReviewService
    ) { }

    @ApiOperation({ summary: resourcesV1.UPDATE_REVIEW_SHOP.displayName })
    @UseGuards(JWTGuard)
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileFieldsInterceptor([{ name: "images", maxCount: 5 }]),
    )
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                rating: { type: "number", minimum: 1, maximum: 5 },
                comment: { type: "string" },
                images: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                },
            },
        },
    })
    @Patch(routesV1.shop.updateReviewShop)
    async updateShopReview(
        @Param("id") id: number,
        @Body() dto: UpdateShopReviewDto,
        @UploadedFiles() files: { images?: MulterFile[] },
        @GetUser() user,
    ) {
        return await this.UpdateShopReviewService.updateReview(+id, dto, files, user);
    }
}
