import { GetUserNotificationService } from '../services/getUserNotification.service';
import { GetUserNotificationQueryDto } from '../dtos/getUserNotification.dto';
export declare class GetUserNotificationController {
    private readonly getUserNotificationService;
    constructor(getUserNotificationService: GetUserNotificationService);
    getUserNotification(userID: string, query: GetUserNotificationQueryDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
