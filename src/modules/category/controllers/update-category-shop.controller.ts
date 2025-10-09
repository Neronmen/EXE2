import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';
import { UpdateCategoryShopDto } from "../dtos/category-shop.dto";
import { UpdateCategoryShopService } from "../services/update-category-shop.service";



@ApiTags(
    `${resourcesV1.UPDATE_CATEGORY_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class UpdateCategoryShopController {
    constructor(
        private readonly updateCategoryShopService: UpdateCategoryShopService,
    ) { }

    @ApiOperation({ summary: resourcesV1.UPDATE_CATEGORY_SHOP.displayName })
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
                name: { type: "string" },
                description: { type: "string" },
                categoryGlobalId: { type: "number", format: "number", example: 1 },
                image: { type: "string", format: "binary" },
            },
        },
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(4)
    @Patch(routesV1.categoryShop.getOne)
    async updateCategoryShop(@UploadedFiles()
    files: {
        image?: MulterFile[];
    }, @Param("id") id: string, @Body() dto: UpdateCategoryShopDto) {
        return this.updateCategoryShopService.UpdateCategoryShop(files, +id, dto);
    }
}