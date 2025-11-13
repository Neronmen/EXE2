import { OrderService } from '../services/order.service';
import { User } from '@prisma/client';
import { CreateOrderFromCartDto } from '../dtos/create-order-from-cart.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createFromCart(user: User, createOrderFromCartDto: CreateOrderFromCartDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    findAll(user: User): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    findOne(user: User, id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    remove(user: User, id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    findAllForAdmin(): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    findOneForAdmin(id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
