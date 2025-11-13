import { ReadNotificationService } from '../services/readNotification.service';
export declare class ReadNotificationController {
    private readonly readNotificationService;
    constructor(readNotificationService: ReadNotificationService);
    readNotification(notificationID: String, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
