import { Region, Condition, Season, CreatePricingTierDto } from './create-product.dto';
export declare class UpdateProductDto {
    categoryGlobalID?: number;
    categoryShopID?: number;
    title?: string;
    description?: string;
    origin?: string;
    brand?: string;
    unit?: string;
    region?: Region[];
    condition?: Condition[];
    season?: Season[];
    storageInstructions?: string;
    usageInstructions?: string;
    certifications?: string;
    stock?: number;
    minOrderQty?: number;
    basePrice?: number;
    PricingTier?: CreatePricingTierDto[];
    isActive?: boolean;
}
