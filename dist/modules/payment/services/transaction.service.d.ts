import { PrismaService } from 'src/libs/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class TransactionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMyTransactions(user: User, skip: number, take: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    getAllTransactions(skip: number, take: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
