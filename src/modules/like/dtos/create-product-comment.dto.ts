import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductCommentDto {

    @ApiProperty({
        example: "Sản phẩm đẹp quá!",
        description: "Nội dung bình luận"
    })
    @IsString()
    content: string;
}
