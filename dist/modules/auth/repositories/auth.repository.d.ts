import { PrismaService } from 'src/libs/prisma/prisma.service';
export declare class AuthRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmailAndProvider(email: string, oauthProvider: string): Promise<({
        Role: {
            permissions: ({
                permission: {
                    description: string | null;
                    id: number;
                    code: string;
                };
            } & {
                id: number;
                roleId: number;
                permissionId: number;
                isActive: boolean;
            })[];
        } & {
            description: string | null;
            id: number;
            name: string;
        };
    } & {
        email: string;
        password: string | null;
        id: number;
        roleID: number;
        name: string | null;
        avatar: string | null;
        phone: string | null;
        status: import(".prisma/client").$Enums.UserStatusEnum;
        oauthProvider: string | null;
        oauthID: string | null;
        isDeleted: boolean;
        createdAt: Date;
        createdBy: number | null;
        updatedAt: Date | null;
        updatedBy: number | null;
    }) | null>;
    findByID(id: number): Promise<({
        Role: {
            permissions: ({
                permission: {
                    description: string | null;
                    id: number;
                    code: string;
                };
            } & {
                id: number;
                roleId: number;
                permissionId: number;
                isActive: boolean;
            })[];
        } & {
            description: string | null;
            id: number;
            name: string;
        };
    } & {
        email: string;
        password: string | null;
        id: number;
        roleID: number;
        name: string | null;
        avatar: string | null;
        phone: string | null;
        status: import(".prisma/client").$Enums.UserStatusEnum;
        oauthProvider: string | null;
        oauthID: string | null;
        isDeleted: boolean;
        createdAt: Date;
        createdBy: number | null;
        updatedAt: Date | null;
        updatedBy: number | null;
    }) | null>;
    createNewUser(data: any): Promise<{
        email: string;
        password: string | null;
        id: number;
        roleID: number;
        name: string | null;
        avatar: string | null;
        phone: string | null;
        status: import(".prisma/client").$Enums.UserStatusEnum;
        oauthProvider: string | null;
        oauthID: string | null;
        isDeleted: boolean;
        createdAt: Date;
        createdBy: number | null;
        updatedAt: Date | null;
        updatedBy: number | null;
    }>;
    createNewUserFacebook(data: any): Promise<{
        email: string;
        password: string | null;
        id: number;
        roleID: number;
        name: string | null;
        avatar: string | null;
        phone: string | null;
        status: import(".prisma/client").$Enums.UserStatusEnum;
        oauthProvider: string | null;
        oauthID: string | null;
        isDeleted: boolean;
        createdAt: Date;
        createdBy: number | null;
        updatedAt: Date | null;
        updatedBy: number | null;
    }>;
    createPasswordReset(userID: number, otpHash: string): Promise<void>;
    getPasswordReset(userID: number): Promise<{
        id: number;
        createdAt: Date;
        otpHash: string;
        expiresAt: Date;
        attempt: number;
        used: boolean;
        userID: number;
    } | null>;
    getPasswordResetNormal(userID: number): Promise<{
        id: number;
        createdAt: Date;
        otpHash: string;
        expiresAt: Date;
        attempt: number;
        used: boolean;
        userID: number;
    }[]>;
    updateAttempt(recordID: number): Promise<void>;
    updateUsed(userID: number): Promise<void>;
    updateUserAvatar(userID: number, newAvatar: any): Promise<void>;
    updatePasswordByUser(userID: number, hashPassword: string): Promise<void>;
    deleteRecordPasswordByUser(userID: number): Promise<void>;
    lastOTPByUser(userID: number): Promise<{
        id: number;
        createdAt: Date;
        otpHash: string;
        expiresAt: Date;
        attempt: number;
        used: boolean;
        userID: number;
    } | null>;
}
