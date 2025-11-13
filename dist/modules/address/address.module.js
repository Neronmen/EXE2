"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const getAllAddress_controller_1 = require("./controllers/getAllAddress.controller");
const getAllAddress_service_1 = require("./services/getAllAddress.service");
const address_repository_1 = require("./repository/address.repository");
const createAddress_controller_1 = require("./controllers/createAddress.controller");
const createAddress_service_1 = require("./services/createAddress.service");
const updateAddress_controller_1 = require("./controllers/updateAddress.controller");
const updateAddress_service_1 = require("./services/updateAddress.service");
const deleteAddress_controller_1 = require("./controllers/deleteAddress.controller");
const deleteAddress_service_1 = require("./services/deleteAddress.service");
const getDetailAddress_controller_1 = require("./controllers/getDetailAddress.controller");
const getDetailAddress_service_1 = require("./services/getDetailAddress.service");
const getDefaultAddress_controller_1 = require("./controllers/getDefaultAddress.controller");
const getDefaultAddress_service_1 = require("./services/getDefaultAddress.service");
const setDefaultAddress_controller_1 = require("./controllers/setDefaultAddress.controller");
const setDefaultAddress_service_1 = require("./services/setDefaultAddress.service");
const httpController = [
    getDefaultAddress_controller_1.GetDefaultAddressController,
    getAllAddress_controller_1.GetAllAddressController,
    createAddress_controller_1.CreateAddressController,
    updateAddress_controller_1.UpdateAddressController,
    deleteAddress_controller_1.DeleteAddressController,
    getDetailAddress_controller_1.GetDetailAddressController,
    setDefaultAddress_controller_1.SetDefaultAddressController
];
const Repository = [
    address_repository_1.AddressRepository
];
const Services = [
    getDefaultAddress_service_1.GetDefaultAddressService,
    getAllAddress_service_1.GetAllAddressService,
    createAddress_service_1.CreateAddressService,
    updateAddress_service_1.UpdateAddressService,
    deleteAddress_service_1.DeleteAddressService,
    getDetailAddress_service_1.GetDetailAddressService,
    setDefaultAddress_service_1.SetDefaultAddressService,
    jwt_1.JwtService
];
let AddressModule = class AddressModule {
};
exports.AddressModule = AddressModule;
exports.AddressModule = AddressModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository],
    })
], AddressModule);
//# sourceMappingURL=address.module.js.map