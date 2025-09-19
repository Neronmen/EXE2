import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { routesV1 } from "src/configs/app.routes";
import { resourcesV1 } from "src/configs/app.permission";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RefreshGuard } from "../guards/refresh.guard";
import { RefreshService } from "../services/refresh-token.service";


@ApiTags(
    `${resourcesV1.REFRESH.parent}`,
)
@Controller(routesV1.apiversion)
export class RefreshController {
    constructor(
        private readonly refreshService: RefreshService
    ) { }
    @ApiOperation({ summary: resourcesV1.REFRESH.displayName })
    @ApiBearerAuth()
    @UseGuards(RefreshGuard)
    @Post(routesV1.auth.refresh)
    async refresh(@Request() req) {
        console.log('vao controller');
        return this.refreshService.refresh(req.user)

    }
}