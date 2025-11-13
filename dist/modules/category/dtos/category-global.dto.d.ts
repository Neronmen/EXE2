export declare class CreateCategoryGlobalDto {
    name: string;
    description?: string;
}
declare const UpdateCategoryGlobalDto_base: import("@nestjs/common").Type<Partial<CreateCategoryGlobalDto>>;
export declare class UpdateCategoryGlobalDto extends UpdateCategoryGlobalDto_base {
}
export declare class FilterCategoryGlobalDto {
    search?: string;
    page?: string;
    limit?: string;
}
export {};
