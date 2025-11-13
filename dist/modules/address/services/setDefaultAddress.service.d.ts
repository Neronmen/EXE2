import { AddressRepository } from "../repository/address.repository";
export declare class SetDefaultAddressService {
    private readonly addRepo;
    constructor(addRepo: AddressRepository);
    setDefault(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
