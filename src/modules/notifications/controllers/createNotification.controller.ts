import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { routesV1 } from 'src/configs/app.routes';
import { resourcesV1 } from 'src/configs/app.permission';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTGuard } from 'src/modules/auth/guards/jwt.guard';
import { CreateNotificationDto } from '../dtos/createNotification.dto';
import { GetUser } from 'src/modules/auth/guards/get-user.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/guards/roles.decorator';
import { CreateNotificationService } from '../services/createNotification.service';
import { PermissionGuard } from 'src/modules/auth/guards/permissions.guard';
import { Permissions } from 'src/modules/auth/guards/permission.decorator';

@ApiTags(`${resourcesV1.CREATE_NOTIFICATION.parent}`)
@Controller(routesV1.apiversion)
export class CreateNotificationController {
  constructor(
    private readonly createnNotificationService: CreateNotificationService
  ) { }
  @ApiOperation({ summary: resourcesV1.CREATE_NOTIFICATION.displayName })
  @ApiBearerAuth()
  @UseGuards(JWTGuard, PermissionGuard)
  @Permissions("CREATE_NOTIFICATION_SYSTEM")
  @Post(routesV1.notification.root)
  async createNotification(@Body() data: CreateNotificationDto, @GetUser() user) {
    return await this.createnNotificationService.createNotification(data, user)
  }
}
