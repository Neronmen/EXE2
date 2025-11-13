import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";
export declare class DeleteAddressService {
    private readonly prisma;
    private readonly jwtService;
    private readonly addRepo;
    constructor(prisma: PrismaService, jwtService: JwtService, addRepo: AddressRepository);
    delete(id: number, user: any): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
}
