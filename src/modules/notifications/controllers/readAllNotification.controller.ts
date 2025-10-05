import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/configs/app.routes';
import { resourcesV1 } from 'src/configs/app.permission';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { ReadAllNotificationService } from '../services/readAllNotication.service';

@ApiTags(`${resourcesV1.READ_ALL_NOTIFICATION.parent}`)
@Controller(routesV1.apiversion)
export class ReadAllNotificationController {
    constructor(
        private readonly ReadAllNotificationService: ReadAllNotificationService
    ) { }
    @ApiOperation({ summary: resourcesV1.READ_ALL_NOTIFICATION.displayName })
    @ApiBearerAuth()
    @UseGuards(JWTGuard)
    @Patch(routesV1.notification.readAllUserNotifications)
    async readAllNotification(@GetUser() user) {
        return await this.ReadAllNotificationService.readAllNotification(user)
    }
}
