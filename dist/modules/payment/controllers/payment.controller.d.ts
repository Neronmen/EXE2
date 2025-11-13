import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { VnpayQueryDto } from '../dtos/vnpay-query.dto';
import { User } from '@prisma/client';
import { TransactionService } from '../services/transaction.service';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
export declare class PaymentController {
    private readonly paymentService;
    private readonly transactionService;
    constructor(paymentService: PaymentService, transactionService: TransactionService);
    createVnpayUrl(createPaymentDto: CreatePaymentDto, req: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    vnpayReturn(query: VnpayQueryDto, req: any, res: any): Promise<any>;
    getMyTransactions(user: User, query: PaginationQueryDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    getAllTransactions(query: PaginationQueryDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
