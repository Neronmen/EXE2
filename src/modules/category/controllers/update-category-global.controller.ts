import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { UpdateCategoryGlobalDto } from "../dtos/category-global.dto";
import { UpdateCategoryGlobalService } from "../services/update-category-global.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';



@ApiTags(
    `${resourcesV1.UPDATE_CATEGORY_GLOBAL.parent}`,
)
@Controller(routesV1.apiversion)
export class UpdateCategoryController {
    constructor(
        private readonly updateCategoryGlobalService: UpdateCategoryGlobalService,
    ) { }

    @ApiOperation({ summary: resourcesV1.UPDATE_CATEGORY_GLOBAL.displayName })
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
                image: { type: "string", format: "binary" },
            },
        },
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2)
    @Patch(routesV1.categoryGlobal.getOne)
    async updateCategoryGlobal(@UploadedFiles()
    files: {
        image?: MulterFile[];
    }, @Param("id") id: string, @Body() dto: UpdateCategoryGlobalDto) {
        return await this.updateCategoryGlobalService.UpdateCategoryGlobal(files, +id, dto);
    }
}