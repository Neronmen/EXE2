import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class ChangePassProfileRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updatePassword(userID: number, hashNewPassword: string): Promise<{
        email: string;
        id: number;
        roleID: number;
        name: string | null;
        phone: string | null;
    }>;
}
