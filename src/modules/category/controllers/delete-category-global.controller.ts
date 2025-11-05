import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateCategoryGlobalDto } from "../dtos/category-global.dto";
import { CreateCategoryGlobalService } from "../services/create-category-global.service";
import { DeleteCategoryGlobalService } from "../services/delete-category-global.service";


@ApiTags(
    `${resourcesV1.DELETE_CATEGORY_GLOBAL.parent}`,
)
@Controller(routesV1.apiversion)
export class DeleteCategoryController {
    constructor(
        private readonly DeleteCategoryGlobalService : DeleteCategoryGlobalService
    ) { }

    @ApiOperation({ summary: resourcesV1.DELETE_CATEGORY_GLOBAL.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard, RolesGuard)
    @Roles(1, 2)
    @Delete(routesV1.categoryGlobal.getOne)
    async DeleteCategoryGlobal(@Param("id") id: string) {
        return await this.DeleteCategoryGlobalService.deleteCategoryGlobal(+id)
    }
}