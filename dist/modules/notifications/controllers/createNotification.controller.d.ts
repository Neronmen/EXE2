import { CreateNotificationDto } from '../dtos/createNotification.dto';
import { CreateNotificationService } from '../services/createNotification.service';
export declare class CreateNotificationController {
    private readonly createnNotificationService;
    constructor(createnNotificationService: CreateNotificationService);
    createNotification(data: CreateNotificationDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
