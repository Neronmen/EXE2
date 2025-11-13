import { PrismaService } from 'src/libs/prisma/prisma.service';
export declare class NotificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSystemNotification(title: string, content: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: number;
        createdAt: Date;
        content: string;
        senderType: import(".prisma/client").$Enums.SenderType | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        senderID: number | null;
        receiverID: number | null;
    }>;
    createUserNotification(senderID: number, receiverID: number, title: string, content: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: number;
        createdAt: Date;
        content: string;
        senderType: import(".prisma/client").$Enums.SenderType | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        isRead: boolean;
        senderID: number | null;
        receiverID: number | null;
    }>;
    getUserNotification(userID: number, skip?: number, take?: number): import(".prisma/client").Prisma.PrismaPromise<{
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        id: number;
        createdAt: Date;
        content: string;
        senderType: import(".prisma/client").$Enums.SenderType | null;
        metadata: import("@prisma/client/runtime/library").JsonValue;
        isRead: boolean;
        sender: {
            id: number;
            roleID: number;
            name: string | null;
            avatar: string | null;
        } | null;
    }[]>;
    countUserNotification(userID: number): import(".prisma/client").Prisma.PrismaPromise<number>;
    findNotificationByID(id: number): Promise<{
        id: number;
        receiverID: number | null;
    } | null>;
    findAllNotificationByUserID(userID: number): Promise<{
        id: number;
        receiverID: number | null;
    }[]>;
    updateManyIsReadNotificationByUserID(userID: number): Promise<void>;
    updateIsReadNotification(notificationID: number): Promise<void>;
}
