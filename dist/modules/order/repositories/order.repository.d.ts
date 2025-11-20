import { PrismaService } from 'src/libs/prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';
type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
export declare class OrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(tx: PrismaTransactionClient, userId: number, addressId: number, totalAmount: number, items: Prisma.OrderItemCreateManyOrderInput[]): Promise<{
        items: {
            id: number;
            orderID: number;
            productID: number;
            quantity: number;
            price: number;
        }[];
    } & {
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        addressID: number;
        totalAmount: number;
        paymentMethod: string | null;
    }>;
    findAll(userId: number): Promise<({
        items: {
            id: number;
            orderID: number;
            productID: number;
            quantity: number;
            price: number;
        }[];
    } & {
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        addressID: number;
        totalAmount: number;
        paymentMethod: string | null;
    })[]>;
    findAllForAdmin(): Promise<{
        user: {
            email: string;
            name: string | null;
            avatar: string | null;
            phone: string | null;
        };
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        totalAmount: number;
        paymentMethod: string | null;
    }[]>;
    findOne(id: number, userId?: number): Promise<({
        items: {
            product: {
                title: string;
                SellerProfile: {
                    slug: string | null;
                    companyName: string;
                    shopAvatar: string | null;
                };
                slug: string;
                ProductImage: {
                    url: string;
                }[];
            };
            productID: number;
            quantity: number;
            price: number;
        }[];
        address: {
            id: number;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date | null;
            userID: number;
            fullName: string;
            province: string | null;
            district: string | null;
            ward: string | null;
            street: string | null;
            isDefault: boolean;
        };
    } & {
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        addressID: number;
        totalAmount: number;
        paymentMethod: string | null;
    }) | null>;
    update(id: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        addressID: number;
        totalAmount: number;
        paymentMethod: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        addressID: number;
        totalAmount: number;
        paymentMethod: string | null;
    }>;
}
export {};
