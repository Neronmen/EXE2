import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";
import { UpdateAddressDto } from "../dtos/update-address.dto";
export declare class UpdateAddressService {
    private readonly prisma;
    private readonly jwtService;
    private readonly addRepo;
    constructor(prisma: PrismaService, jwtService: JwtService, addRepo: AddressRepository);
    update(id: number, data: UpdateAddressDto, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
