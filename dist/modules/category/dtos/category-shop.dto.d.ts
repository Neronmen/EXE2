export declare class CreateCategoryShopDto {
    name: string;
    description?: string;
    categoryGlobalId?: number;
}
declare const UpdateCategoryShopDto_base: import("@nestjs/common").Type<Partial<CreateCategoryShopDto>>;
export declare class UpdateCategoryShopDto extends UpdateCategoryShopDto_base {
}
export declare class FilterCategoryShopDto {
    search?: string;
    page?: string;
    limit?: string;
}
export {};
