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
import { ResubmitSellerDto } from "../dtos/resubmit-seller.dto";
import { ResubmitRegisterSellerService } from "../services/resubmitRegisterSeller.service";


@ApiTags(`${resourcesV1.RESUBMIT_REGISTER_SELLER.parent}`)
@Controller(routesV1.apiversion)
export class ResubmitRegisterSellerController {
    constructor(private readonly ResubmitRegisterSellerService: ResubmitRegisterSellerService) { }

    @ApiOperation({ summary: resourcesV1.RESUBMIT_REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(6)
    @Patch(routesV1.seller.resubmitRegisterSeller)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'idCardFront', maxCount: 1 },
            { name: 'idCardBack', maxCount: 1 },
            { name: 'businessLicense', maxCount: 1 },
            { name: 'foodSafetyCert', maxCount: 1 },
        ]),
    )
    @ApiBody({
        description: 'Gửi lại hồ sơ seller (tất cả trường đều optional — chỉ cập nhật những gì cần)',
        schema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', example: 'Công ty ABC (cập nhật)' },
                brandName: { type: 'string', example: 'ABC Food (cập nhật)' },
                businessPhone: { type: 'string', example: '0905123456' },
                businessAddress: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
                description: { type: 'string', example: 'Cập nhật mô tả' },
                idCardFront: { type: 'string', format: 'binary' },
                idCardBack: { type: 'string', format: 'binary' },
                businessLicense: { type: 'string', format: 'binary' },
                foodSafetyCert: { type: 'string', format: 'binary' },
            },
        },
    })
    async resubmitSeller(
        @Body() dto: ResubmitSellerDto,
        @UploadedFiles() files: {
            idCardFront?: MulterFile[];
            idCardBack?: MulterFile[];
            businessLicense?: MulterFile[];
            foodSafetyCert?: MulterFile[];
        },
        @GetUser() user,
    ) {
        return await this.ResubmitRegisterSellerService.resubmitSeller(dto, files, user);
    }
}
