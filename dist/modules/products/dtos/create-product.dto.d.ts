import type { File as MulterFile } from 'multer';
export declare enum Region {
    MIEN_BAC = "MIEN_BAC",
    MIEN_TRUNG = "MIEN_TRUNG",
    MIEN_NAM = "MIEN_NAM",
    TAY_NGUYEN = "TAY_NGUYEN"
}
export declare enum Condition {
    FRESH = "FRESH",
    PROCESSED = "PROCESSED",
    DRIED = "DRIED"
}
export declare enum Season {
    SPRING = "SPRING",
    SUMMER = "SUMMER",
    AUTUMN = "AUTUMN",
    WINTER = "WINTER"
}
export declare class CreatePricingTierDto {
    minQty: number;
    price: number;
}
export declare class CreateProductDto {
    categoryGlobalID: number;
    categoryShopID?: number;
    title: string;
    description?: string;
    origin?: string;
    brand?: string;
    unit?: string;
    region: Region[];
    condition: Condition[];
    season: Season[];
    storageInstructions?: string;
    usageInstructions?: string;
    certifications?: string;
    stock: number;
    minOrderQty: number;
    basePrice: number;
    images?: MulterFile[];
    PricingTier?: CreatePricingTierDto[];
    isActive?: boolean;
}
