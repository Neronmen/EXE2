import { Body, Controller, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from "multer";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { ResubmitSellerDto } from "src/modules/seller/dtos/resubmit-seller.dto";
import { UpdateProfileShopService } from "../services/updateProfileShop.service";

@ApiTags(`${resourcesV1.UPDATE_PROFILE_SHOP.parent}`)
@Controller(routesV1.apiversion)
export class UpdateShopController {
    constructor(
        private readonly UpdateProfileShopService: UpdateProfileShopService
    ) { }
    @ApiOperation({ summary: resourcesV1.UPDATE_PROFILE_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Patch(routesV1.shop.root)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'shopAvatar', maxCount: 1 },
            { name: 'shopBanner', maxCount: 1 },
        ]),
    )
    @ApiBody({
        description: 'Cập nhật lại hồ sơ shop (tất cả trường đều optional — chỉ cập nhật những gì cần)',
        schema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', example: 'Công ty ABC (cập nhật)' },
                brandName: { type: 'string', example: 'ABC Food (cập nhật)' },
                businessPhone: { type: 'string', example: '0905123456' },
                businessAddress: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
                description: { type: 'string', example: 'Cập nhật mô tả' },
                shopAvatar: { type: 'string', format: 'binary' },
                shopBanner: { type: 'string', format: 'binary' },
            },
        },
    })
    async resubmitSeller(
        @Body() dto: ResubmitSellerDto,
        @UploadedFiles() files: {
            shopAvatar?: MulterFile[];
            shopBanner?: MulterFile[];
        },
        @GetUser() user,
    ) {

        return await this.UpdateProfileShopService.updateProfileShop(dto, files, user)
    }
}
