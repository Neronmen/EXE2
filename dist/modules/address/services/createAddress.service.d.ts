import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";
import { CreateAddressDto } from "../dtos/create-address.dto";
export declare class CreateAddressService {
    private readonly prisma;
    private readonly jwtService;
    private readonly addRepo;
    constructor(prisma: PrismaService, jwtService: JwtService, addRepo: AddressRepository);
    create(data: CreateAddressDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
