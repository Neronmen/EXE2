import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { FilterCategoryGlobalDto } from "../dtos/category-global.dto";
import { GetListCategoryGlobalService } from "../services/getList-category-global.service";


@ApiTags(
    `${resourcesV1.GET_LIST_CATEGORY_GLOBAL.parent}`,
)
@Controller(routesV1.apiversion)
export class GetListCategoryController {
    constructor(
        private readonly GetListCategoryGlobalService: GetListCategoryGlobalService
    ) { }

    @ApiOperation({ summary: resourcesV1.GET_LIST_CATEGORY_GLOBAL.displayName })
    @Get(routesV1.categoryGlobal.publicCategoriesGlobal)
    async getListCategoryGlobal(@Query() query: FilterCategoryGlobalDto) {
        return await this.GetListCategoryGlobalService.getListCategoryGlobal(query)
    }
}