declare class OrderItemDto {
    productId: number;
    quantity: number;
}
export declare class CreateOrderDto {
    addressId: number;
    items: OrderItemDto[];
}
export {};
