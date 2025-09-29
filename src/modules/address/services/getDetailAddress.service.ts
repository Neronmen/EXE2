import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";


@Injectable()
export class GetDetailAddressService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly addRepo: AddressRepository
    ) { }
    async getDetailAddress(id: number, user) {
        const address = await this.addRepo.findOneAddress(id, Number(user.id));
        if (!address) {
            return errorResponse(404, 'Không tìm thấy địa chỉ này', 'NOT_FOUND');
        }
        return successResponse(200, address, "Lấy chi tiết địa chỉ thành công");
    }
}