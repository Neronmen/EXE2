import { OrderRepository } from '../repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CreateOrderFromCartDto } from '../dtos/create-order-from-cart.dto';
export declare class OrderService {
    private readonly orderRepository;
    private readonly prisma;
    constructor(orderRepository: OrderRepository, prisma: PrismaService);
    private _createOrderLogic;
    createFromCart(userId: number, createOrderFromCartDto: CreateOrderFromCartDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    create(userId: number, createOrderDto: CreateOrderDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    findAll(userId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    findOne(id: number, userId?: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    update(id: number, userId: number, updateOrderDto: UpdateOrderDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    remove(id: number, userId: number): Promise<{
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
    removeForAdmin(id: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
