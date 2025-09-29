import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";
import { UpdateAddressDto } from "../dtos/update-address.dto";


@Injectable()
export class UpdateAddressService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly addRepo: AddressRepository
    ) { }
    async update(id: number, data: UpdateAddressDto, user) {
        const checkExist = await this.addRepo.findOneAddress(id, Number(user.id));
        if (!checkExist) {
            return errorResponse(400, 'Không tìm thấy địa chỉ này', 'NOT_FOUND')
        }
        if (data.isDefault === true) {
            await this.prisma.address.updateMany({
                where: {
                    userID: Number(user.id),
                    NOT: { id }
                },
                data: { isDefault: false }
            });
        }
        if (data.isDefault === false && checkExist.isDefault === true) {
            const otherDefault = await this.prisma.address.findFirst({
                where: {
                    userID: Number(user.id),
                    NOT: { id },
                    isDefault: true
                }
            });
            if (!otherDefault) {
                return errorResponse(400, 'Bạn phải có ít nhất một địa chỉ mặc định', 'NEED_DEFAULT');
            }
        }
        const addUpdate = await this.addRepo.updateAddress(data, id)
        return successResponse(200, addUpdate, "Cập nhật địa chỉ thành công");
    }
}