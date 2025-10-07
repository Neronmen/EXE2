import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JWTGuard } from "src/modules/auth/guards/jwt.guard";
import { GetUser } from "src/modules/auth/guards/get-user.decorator";
import { DeleteReviewService } from "../services/deleteReviewShop.service";

@ApiTags(
    `${resourcesV1.DELETE_REVIEW_SHOP.parent}`,
)
@Controller(routesV1.apiversion)
export class DeleteReviewShopController {
    constructor(
        private readonly DeleteReviewService: DeleteReviewService
    ) { }
    @ApiOperation({ summary: resourcesV1.DELETE_REVIEW_SHOP.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Delete(routesV1.shop.updateReviewShop)
    async deleteReviewShop(@Param("id") reviewID: number, @GetUser() user) {
        return await this.DeleteReviewService.deleteReview(+reviewID, user)
    }
}