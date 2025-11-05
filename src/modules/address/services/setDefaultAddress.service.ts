import { Injectable } from "@nestjs/common";
import { errorResponse, successResponse } from "src/common/utils/response.util";
import { AddressRepository } from "../repository/address.repository";


@Injectable()
export class SetDefaultAddressService {
    constructor(
        private readonly addRepo: AddressRepository
    ) { }
    async setDefault(id: number, user) {
        const checkExist = await this.addRepo.findOneAddress(id, user.id)
        if (!checkExist) {
            return errorResponse(404, "Không tìm thấy địa chỉ này", "NOT_FOUND");
        }
        // Bỏ mặc định tất cả địa chỉ khác
        await this.addRepo.updateAddressNotDefault(user.id)

        // Gán mặc định cho địa chỉ được chọn 
        const updated = await this.addRepo.updateAddressDefault(id)

        return successResponse(200, updated, "Cập nhật địa chỉ mặc định thành công");
    }
}