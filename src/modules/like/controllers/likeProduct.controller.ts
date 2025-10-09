import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/modules/auth/guards/roles.decorator";
import { LikeAndUnlikeProductService } from "../services/likeProduct.service";

@ApiTags(
    `${resourcesV1.LIKE_AND_UNLIKE_PRODUCT.parent}`,
)
@Controller(routesV1.apiversion)
export class LikeAndUnlikeProductController {
    constructor(
        private readonly likeService: LikeAndUnlikeProductService,
    ) { }
    @ApiOperation({ summary: resourcesV1.LIKE_AND_UNLIKE_PRODUCT.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Post(routesV1.like.getOne)
    async likeAndUnlikeProduct(@Param("id", ParseIntPipe) productID: number, @GetUser() user) {
        return this.likeService.likeProduct(+productID, user);
    }
}