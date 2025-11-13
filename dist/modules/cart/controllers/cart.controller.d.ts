import { User } from '@prisma/client';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(user: User): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    addItem(user: User, addToCartDto: AddToCartDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    updateItem(user: User, itemId: number, updateCartItemDto: UpdateCartItemDto): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    removeItem(user: User, itemId: number): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
