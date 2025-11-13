import { PrismaService } from 'src/libs/prisma/prisma.service';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { CartRepository } from '../repositories/cart.repository';
export declare class CartService {
    private readonly prisma;
    private readonly cartRepository;
    constructor(prisma: PrismaService, cartRepository: CartRepository);
    private findOrCreateCart;
    getCart(userId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    addItemToCart(userId: number, addToCartDto: AddToCartDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    updateCartItem(userId: number, cartItemId: number, updateDto: UpdateCartItemDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    removeItemFromCart(userId: number, cartItemId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
