import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/configs/app.routes';
import { resourcesV1 } from 'src/configs/app.permission';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { GetUserNotificationService } from '../services/getUserNotification.service';
import { GetUserNotificationQueryDto } from '../dtos/getUserNotification.dto';

@ApiTags(`${resourcesV1.GET_USER_NOTIFICATION.parent}`)
@Controller(routesV1.apiversion)
export class GetUserNotificationController {
    constructor(
        private readonly getUserNotificationService: GetUserNotificationService
    ) { }
    @ApiOperation({ summary: resourcesV1.GET_USER_NOTIFICATION.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Get(routesV1.notification.getUserNotifications)
    async getUserNotification(@Param('userID') userID: string, @Query() query: GetUserNotificationQueryDto) {
        return await this.getUserNotificationService.getUserNotifications(Number(userID), query.skip, query.take)
    }
}
