import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';


// export enum NotificationType {
//     ORDER_STATUS = 'ORDER_STATUS',
//     SYSTEM_SALE = 'SYSTEM_SALE',
//     SYSTEM_UPDATE = 'SYSTEM_UPDATE',
//     NEW_PRODUCT = 'NEW_PRODUCT',
//     CUSTOM = 'CUSTOM',
// }
export class CreateNotificationDto {
    @ApiPropertyOptional({
        description: 'Danh sách userId nhận thông báo. Nếu null hoặc không truyền => broadcast cho tất cả',
        type: [Number],
        example: [1, 2, 3],
    })
    @IsOptional()
    @IsArray()
    userIDs?: number[];

    // @ApiProperty({
    //     description: 'Loại thông báo',
    //     enum: NotificationType,
    //     enumName: 'NotificationType',
    //     example: NotificationType.SYSTEM_SALE,
    // })
    // @IsNotEmpty()
    // @IsEnum(NotificationType)
    // type: NotificationType;

    @ApiProperty({
        description: 'Tiêu đề thông báo',
        example: 'Thông báo bảo trì hệ thống',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Nội dung chi tiết thông báo',
        example: 'Hệ thống sẽ bảo trì lúc 23h00 hôm nay',
    })
    @IsNotEmpty()
    @IsString()
    content: string;

}
