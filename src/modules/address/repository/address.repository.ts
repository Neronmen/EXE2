import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { UpdateAddressDto } from '../dtos/update-address.dto';

@Injectable()
export class AddressRepository {
    constructor(private readonly prisma: PrismaService) { }
    async getAllAddress(userID: number) {
        return await this.prisma.address.findMany({
            where: { userID },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOneAddress(id: number, userID: number) {
        return await this.prisma.address.findUnique({
            where: { id, userID },
        });
    }

    async findDefault(userID: number) {
        return await this.prisma.address.findFirst({
            where: {
                userID,
                isDefault: true,
            },
        });
    }
    async deleteAddress(id: number) {
        return await this.prisma.address.delete({
            where: { id },
        });
    }

    async createAddress(data: CreateAddressDto, userID: number) {
        return await this.prisma.address.create({
            data: {
                ...data,
                userID
            }
        });
    }
    async updateAddress(data: UpdateAddressDto, id: number) {
        return await this.prisma.address.update({
            where: { id },
            data: {
                ...data
            }
        });
    }
    async updateAddressNotDefault(userID: number) {
        return await this.prisma.address.updateMany({
            where: { userID },
            data: { isDefault: false },
        });
    }
    async updateAddressDefault(id: number) {
        return await this.prisma.address.update({
            where: { id },
            data: { isDefault: true },
        });
    }
    async checkAddressExist(data: CreateAddressDto, userID: number) {
        return await this.prisma.address.findFirst({
            where: {
                userID,
                fullName: data.fullName,
                phone: data.phone,
                province: data.province,
                district: data.district,
                ward: data.ward,
                street: data.street,
            },
            select: {
                id: true
            }
        });
    }

}
