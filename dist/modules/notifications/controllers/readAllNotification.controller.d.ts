import { ReadAllNotificationService } from '../services/readAllNotication.service';
export declare class ReadAllNotificationController {
    private readonly ReadAllNotificationService;
    constructor(ReadAllNotificationService: ReadAllNotificationService);
    readAllNotification(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
