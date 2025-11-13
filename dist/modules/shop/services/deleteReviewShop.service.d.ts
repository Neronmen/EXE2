import { PrismaService } from "src/libs/prisma/prisma.service";
export declare class DeleteReviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deleteReview(reviewID: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
