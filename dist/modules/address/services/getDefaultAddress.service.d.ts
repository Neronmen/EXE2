import { AddressRepository } from "../repository/address.repository";
export declare class GetDefaultAddressService {
    private readonly addRepo;
    constructor(addRepo: AddressRepository);
    getDefault(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
