"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetDefaultAddressService = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../../../common/utils/response.util");
const address_repository_1 = require("../repository/address.repository");
let SetDefaultAddressService = class SetDefaultAddressService {
    addRepo;
    constructor(addRepo) {
        this.addRepo = addRepo;
    }
    async setDefault(id, user) {
        const checkExist = await this.addRepo.findOneAddress(id, user.id);
        if (!checkExist) {
            return (0, response_util_1.errorResponse)(404, "Không tìm thấy địa chỉ này", "NOT_FOUND");
        }
        await this.addRepo.updateAddressNotDefault(user.id);
        const updated = await this.addRepo.updateAddressDefault(id);
        return (0, response_util_1.successResponse)(200, updated, "Cập nhật địa chỉ mặc định thành công");
    }
};
exports.SetDefaultAddressService = SetDefaultAddressService;
exports.SetDefaultAddressService = SetDefaultAddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [address_repository_1.AddressRepository])
], SetDefaultAddressService);
//# sourceMappingURL=setDefaultAddress.service.js.map