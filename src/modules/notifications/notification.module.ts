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



const httpController = [
    CreateNotificationController,
    GetUserNotificationController
]

const Repository = [
    NotificationRepository
]


const Services = [
    CreateNotificationService,
    GetUserNotificationService,
    JwtService
]

@Module({
    imports: [PrismaModule],
    controllers: [...httpController],
    providers: [...Services, ...Repository, NotificationGateway, AuthRepository],
})
export class NotificationModule { }     
