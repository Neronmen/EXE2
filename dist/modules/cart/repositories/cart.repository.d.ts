import { PrismaService } from 'src/libs/prisma/prisma.service';
export declare class CartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: number): Promise<({
        CartItem: ({
            Product: {
                title: string;
                SellerProfile: {
                    companyName: string;
                    slug: string | null;
                    shopAvatar: string | null;
                };
                slug: string;
                stock: number;
                basePrice: number;
                PricingTier: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date | null;
                    productID: number;
                    minQty: number;
                    price: number;
                }[];
                ProductImage: {
                    url: string;
                }[];
            };
        } & {
            id: number;
            createdAt: Date;
            quantity: number;
            productId: number;
            cartId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        userId: number;
    }) | null>;
    create(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        userId: number;
    }>;
    findItem(cartId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        productId: number;
        cartId: number;
    } | null>;
    findItemByIdAndUserId(cartItemId: number, userId: number): Promise<({
        Product: {
            description: string | null;
            title: string;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date | null;
            updatedBy: number | null;
            isActive: boolean;
            slug: string;
            avgRating: number;
            totalReviews: number;
            sellerID: number;
            categoryGlobalID: number;
            categoryShopID: number | null;
            origin: string | null;
            brand: string | null;
            unit: string | null;
            region: import(".prisma/client").$Enums.Region[];
            condition: import(".prisma/client").$Enums.Condition[];
            season: import(".prisma/client").$Enums.Season[];
            storageInstructions: string | null;
            usageInstructions: string | null;
            certifications: string | null;
            stock: number;
            minOrderQty: number;
            basePrice: number;
            isFeatured: boolean;
            soldCount: number;
            viewCount: number;
        };
    } & {
        id: number;
        createdAt: Date;
        quantity: number;
        productId: number;
        cartId: number;
    }) | null>;
    createItem(cartId: number, productId: number, quantity: number): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        productId: number;
        cartId: number;
    }>;
    updateItemQuantity(cartItemId: number, newQuantity: number): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        productId: number;
        cartId: number;
    }>;
    incrementItemQuantity(cartItemId: number, quantity: number): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        productId: number;
        cartId: number;
    }>;
    deleteItem(cartItemId: number): Promise<{
        id: number;
        createdAt: Date;
        quantity: number;
        productId: number;
        cartId: number;
    }>;
}
