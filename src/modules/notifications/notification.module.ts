import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { CreateNotificationController } from './controllers/createNotification.controller';
import { CreateNotificationService } from './services/createNotification.service';
import { NotificationGateway } from './gateway/notification.gateway';
import { AuthRepository } from '../auth/repositories/auth.repository';
import { GetUserNotificationService } from './services/getUserNotification.service';
import { GetUserNotificationController } from './controllers/getUserNotification.controller';
import { NotificationRepository } from './repository/notification.repository';
import { ReadNotificationService } from './services/readNotification.service';
import { ReadNotificationController } from './controllers/readNotification.controller';
import { ReadAllNotificationController } from './controllers/readAllNotification.controller';
import { ReadAllNotificationService } from './services/readAllNotication.service';



const httpController = [
    CreateNotificationController,
    GetUserNotificationController,
    ReadNotificationController,
    ReadAllNotificationController

]

const Repository = [
    NotificationRepository
]


const Services = [
    CreateNotificationService,
    GetUserNotificationService,
    ReadNotificationService,
    ReadAllNotificationService,
    JwtService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository, NotificationGateway, AuthRepository],
})
export class NotificationModule { }     
