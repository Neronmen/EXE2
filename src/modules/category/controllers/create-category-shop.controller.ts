import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateCategoryShopDto } from "../dtos/category-shop.dto";
import { CreateCategoryShopService } from "../services/create-category-shop.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';



@ApiTags(
    `${resourcesV1.CREATE_CATEGORY_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class CreateCategoryShopController {
    constructor(
        private readonly createCategoryShopService: CreateCategoryShopService,
    ) { }

    @ApiOperation({ summary: resourcesV1.CREATE_CATEGORY_SHOP.displayName })
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: "image", maxCount: 1 },
        ])
    )
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                name: { type: "string", example: "Rau hữu cơ" },
                description: { type: "string", example: "Các loại rau trồng hữu cơ" },
                categoryGlobalId: { type: "number", format: "number", example: 1 },
                image: { type: "string", format: "binary" },
            },
            required: ['name',],
        },
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Post(routesV1.categoryShop.root)
    async createCategoryShop(@UploadedFiles()
    files: {
        image?: MulterFile[];
    }, @Body() dto: CreateCategoryShopDto, @GetUser() user) {
        return this.createCategoryShopService.createCategoryShop(files, dto, user);
    }
}