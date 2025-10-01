import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { RegisterSellerService } from "../services/registerSeller.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { RegisterSellerDto } from "../dtos/register-seller.dto";
import type { File as MulterFile } from 'multer';


@ApiTags(
    `${resourcesV1.REGISTER_SELLER.parent}`,
)
@Controller(routesV1.apiversion)
export class RegisterSellerController {
    constructor(
        private readonly registerSellerService: RegisterSellerService
    ) { }
    @ApiOperation({ summary: resourcesV1.REGISTER_SELLER.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Post(routesV1.seller.registerSeller)
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
        description: 'Đăng ký seller (tất cả trường và file đều bắt buộc)',
        schema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', example: 'Công ty ABC' },
                brandName: { type: 'string', example: 'ABC Food' },
                businessPhone: { type: 'string', example: '0905123456' },
                businessAddress: { type: 'string', example: '123 Nguyễn Văn Linh, Đà Nẵng' },
                description: { type: 'string', example: 'Chuyên phân phối thực phẩm sạch' },
                idCardFront: { type: 'string', format: 'binary' },
                idCardBack: { type: 'string', format: 'binary' },
                businessLicense: { type: 'string', format: 'binary' },
                foodSafetyCert: { type: 'string', format: 'binary' },
            },
            required: [
                'companyName',
                'brandName',
                'businessPhone',
                'businessAddress',
                'description',
                'idCardFront',
                'idCardBack',
                'businessLicense',
                'foodSafetyCert',
            ],
        },
    })
    async registerSeller(@Body() dto: RegisterSellerDto,
        @UploadedFiles() files: {
            idCardFront: MulterFile[];
            idCardBack: MulterFile[];
            businessLicense: MulterFile[];
            foodSafetyCert: MulterFile[];
        },
        @GetUser() user

    ) {
        if (!files.idCardFront?.[0] ||
            !files.idCardBack?.[0] ||
            !files.businessLicense?.[0] ||
            !files.foodSafetyCert?.[0]) {
            throw new Error('Thiếu file bắt buộc');
        }
        return await this.registerSellerService.registerSeller(dto, files, user)
    }
}