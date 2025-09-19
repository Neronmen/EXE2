import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRolePermissionItemDto {
    @ApiProperty({
        example: 1,
        description: 'ID của quyền (permission)',
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        example: true,
        description: 'Trạng thái quyền: true = bật, false = tắt',
    })
    @IsBoolean()
    isActive: boolean;
}

export class UpdateRolePermissionsDto {
    @ApiProperty({
        type: [UpdateRolePermissionItemDto],
        description: 'Danh sách quyền cần cập nhật cho role',
        example: [
            { id: 1, isActive: true },
            { id: 2, isActive: false },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateRolePermissionItemDto)
    permissions: UpdateRolePermissionItemDto[];
}
