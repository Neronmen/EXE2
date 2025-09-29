import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { AddressRepository } from "../repository/address.repository";
import { CreateAddressDto } from "../dtos/create-address.dto";


@Injectable()
export class CreateAddressService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly addRepo: AddressRepository
    ) { }
    async create(data: CreateAddressDto, user) {
        const exists = await this.addRepo.checkAddressExist(data, Number(user.id))
        if (exists) {
            return errorResponse(400, 'Địa chỉ này đã tồn tại.', "ADDRESS_EXIST");
        }
        // const address = await this.addRepo.createAddress(data, Number(user.id))
        const address = await this.prisma.$transaction(async (tx) => {
            const count = await tx.address.count({ where: { userID: Number(user.id) } });
            let isDefault = data.isDefault ?? false;
            if (count === 0) {
                isDefault = true;
            }
            if (isDefault) {
                await tx.address.updateMany({
                    where: { userID: Number(user.id), isDefault: true },
                    data: { isDefault: false },
                });
            }
            return tx.address.create({
                data: {
                    ...data,
                    userID: Number(user.id),
                    isDefault,
                },
            });
        });
        return successResponse(200, address, "Tạo địa chỉ thành công");
    }
}