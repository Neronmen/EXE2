import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";


@Injectable()
export class GetAllAddressService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly addRepo: AddressRepository
    ) { }
    async findAllAddress(user) {
        try {
            const addresses = await this.addRepo.getAllAddress(Number(user.id))
            return successResponse(200, addresses, "Lấy danh sách địa chỉ thành công");
        } catch (error) {
            return errorResponse(400, "Lấy danh sách địa chỉ thành công", error);
        }

    }
}