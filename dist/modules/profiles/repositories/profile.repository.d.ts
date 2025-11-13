import { PrismaService } from 'src/libs/prisma/prisma.service';
export declare class ProfileRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateProfile(userID: number, dataUpdate: any): Promise<{
        email: string;
        id: number;
        name: string | null;
        avatar: string | null;
        phone: string | null;
    }>;
}
