"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const registerSeller_controller_1 = require("./controllers/registerSeller.controller");
const registerSeller_service_1 = require("./services/registerSeller.service");
const supabase_service_1 = require("../common/subapase/supabase.service");
const getProfileRegisterSeller_controller_1 = require("./controllers/getProfileRegisterSeller.controller");
const getProfileRegisterSeller_service_1 = require("./services/getProfileRegisterSeller.service");
const getSellersRegisterSeller_controller_1 = require("./controllers/getSellersRegisterSeller.controller");
const getSellersRegisterSeller_service_1 = require("./services/getSellersRegisterSeller.service");
const auth_module_1 = require("../auth/auth.module");
const getDetailRegisterSeller_controller_1 = require("./controllers/getDetailRegisterSeller.controller");
const getDetailRegisterSeller_service_1 = require("./services/getDetailRegisterSeller.service");
const notification_gateway_1 = require("../notifications/gateway/notification.gateway");
const approveRegisterSeller_controller_1 = require("./controllers/approveRegisterSeller.controller");
const approveRegisterSeller_service_1 = require("./services/approveRegisterSeller.service");
const rejectRegisterSeller_controller_1 = require("./controllers/rejectRegisterSeller.controller");
const rejectRegisterSeller_service_1 = require("./services/rejectRegisterSeller.service");
const resubmitRegisterSeller_controller_1 = require("./controllers/resubmitRegisterSeller.controller");
const resubmitRegisterSeller_service_1 = require("./services/resubmitRegisterSeller.service");
const httpController = [
    registerSeller_controller_1.RegisterSellerController,
    getProfileRegisterSeller_controller_1.GetProfileRegisterSellerController,
    getSellersRegisterSeller_controller_1.GetSellersRegisterSellerController,
    getDetailRegisterSeller_controller_1.GetDetailProfileRegisterSellerController,
    approveRegisterSeller_controller_1.ApproveRegisterSellerController,
    rejectRegisterSeller_controller_1.RejectRegisterSellerController,
    resubmitRegisterSeller_controller_1.ResubmitRegisterSellerController
];
const Repository = [];
const Services = [
    registerSeller_service_1.RegisterSellerService,
    getProfileRegisterSeller_service_1.GetProfileRegisterSellerService,
    getSellersRegisterSeller_service_1.GetSellersRegisterSellerService,
    getDetailRegisterSeller_service_1.GetDetailSellersRegisterSellerService,
    approveRegisterSeller_service_1.ApproveRegisterSellerService,
    rejectRegisterSeller_service_1.RejectRegisterSellerService,
    resubmitRegisterSeller_service_1.ResubmitRegisterSellerService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService,
];
let SellerModule = class SellerModule {
};
exports.SellerModule = SellerModule;
exports.SellerModule = SellerModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository, notification_gateway_1.NotificationGateway],
    })
], SellerModule);
//# sourceMappingURL=seller.module.js.map