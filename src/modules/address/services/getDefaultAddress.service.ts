import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";


@Injectable()
export class GetDefaultAddressService {
    constructor(
        private readonly addRepo: AddressRepository
    ) { }
    async getDefault(user) {
        const address = await this.addRepo.findDefault(user.id);

        if (!address) {
            return errorResponse(404, "Chưa có địa chỉ mặc định", "NOT_FOUND");
        }
        return successResponse(200, address, "Lấy địa chỉ mặc định thành công");

    }
}