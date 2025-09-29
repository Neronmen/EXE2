import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";


@Injectable()
export class DeleteAddressService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly addRepo: AddressRepository
    ) { }
    async delete(id: number, user) {
        const checkExist = await this.addRepo.findOneAddress(id, Number(user.id));
        if (!checkExist) {
            return errorResponse(400, 'Không tìm thấy địa chỉ này', 'NOT_FOUND')
        }

        const adddressDele = await this.addRepo.deleteAddress(id);

        // Nếu xoá địa chỉ mặc định thì set mặc định cho địa chỉ khác
        if (checkExist.isDefault) {
            const another = await this.prisma.address.findFirst({
                where: { userID: Number(user.id) },
                orderBy: { createdAt: 'asc' },
                select: { id: true }
            });

            if (another) {
                await this.prisma.address.update({
                    where: { id: another.id },
                    data: { isDefault: true }
                });
            }
        }
        return successResponse(200, adddressDele, 'Xóa địa chỉ thành công')

    }
}