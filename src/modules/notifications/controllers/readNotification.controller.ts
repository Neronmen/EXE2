import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/configs/app.routes';
import { resourcesV1 } from 'src/configs/app.permission';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { ReadNotificationService } from '../services/readNotification.service';

@ApiTags(`${resourcesV1.READ_NOTIFICATION.parent}`)
@Controller(routesV1.apiversion)
export class ReadNotificationController {
    constructor(
        private readonly readNotificationService: ReadNotificationService
    ) { }
    @ApiOperation({ summary: resourcesV1.READ_NOTIFICATION.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Patch(routesV1.notification.readUserNotifications)
    async readNotification(@Param('notificationID') notificationID: String, @GetUser() user) {
        return await this.readNotificationService.readNotification(Number(notificationID), user)
    }
}
