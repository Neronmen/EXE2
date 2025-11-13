import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { UpdateAddressDto } from '../dtos/update-address.dto';
export declare class AddressRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllAddress(userID: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    }[]>;
    findOneAddress(id: number, userID: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    } | null>;
    findDefault(userID: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    } | null>;
    deleteAddress(id: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    }>;
    createAddress(data: CreateAddressDto, userID: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    }>;
    updateAddress(data: UpdateAddressDto, id: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    }>;
    updateAddressNotDefault(userID: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    updateAddressDefault(id: number): Promise<{
        id: number;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        userID: number;
        fullName: string;
        province: string | null;
        district: string | null;
        ward: string | null;
        street: string | null;
        isDefault: boolean;
    }>;
    checkAddressExist(data: CreateAddressDto, userID: number): Promise<{
        id: number;
    } | null>;
}
