import { OrderStatus } from '@prisma/client';
export declare const USER_UPDATE_GROUP = "user_update";
export declare const ADMIN_UPDATE_GROUP = "admin_update";
export declare class UpdateOrderDto {
    status?: OrderStatus;
}
