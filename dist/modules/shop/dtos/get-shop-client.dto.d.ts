export declare enum ShopSortEnum {
    LATEST = "latest",
    OLDEST = "oldest",
    TOP_RATED = "topRated"
}
export declare class GetShopClientDto {
    search?: string;
    page?: number;
    limit?: number;
    sort?: ShopSortEnum;
}
