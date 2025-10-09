import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateCategoryGlobalDto } from "../dtos/category-global.dto";
import { CreateCategoryGlobalService } from "../services/create-category-global.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import type { File as MulterFile } from 'multer';



@ApiTags(
    `${resourcesV1.CREATE_CATEGORY_GLOBAL.parent}`,
)
@Controller(routesV1.apiversion)
export class CreateCategoryController {
    constructor(
        private readonly CreateCategoryGlobalService: CreateCategoryGlobalService
    ) { }

    @ApiOperation({ summary: resourcesV1.CREATE_CATEGORY_GLOBAL.displayName })
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
            required: ['name',],
        },
    })
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2)
    @Post(routesV1.categoryGlobal.root)
    async createCategoryGlobal(@UploadedFiles()
    files: {
        image?: MulterFile[];
    }, @Body() dto: CreateCategoryGlobalDto) {
        return await this.CreateCategoryGlobalService.createCategoryGlobal(files, dto)
    }
}