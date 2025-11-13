export declare enum SellerStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class GetAllSellersDto {
    status?: SellerStatus;
}
