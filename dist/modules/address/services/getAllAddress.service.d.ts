import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";
export declare class GetAllAddressService {
    private readonly prisma;
    private readonly jwtService;
    private readonly addRepo;
    constructor(prisma: PrismaService, jwtService: JwtService, addRepo: AddressRepository);
    findAllAddress(user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
