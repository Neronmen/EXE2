"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const supabase_service_1 = require("../common/subapase/supabase.service");
const auth_module_1 = require("../auth/auth.module");
const notification_gateway_1 = require("../notifications/gateway/notification.gateway");
const getProfileShop_controller_1 = require("./controllers/getProfileShop.controller");
const getProfileShop_service_1 = require("./services/getProfileShop.service");
const updateProfileShop_controller_1 = require("./controllers/updateProfileShop.controller");
const updateProfileShop_service_1 = require("./services/updateProfileShop.service");
const followShop_controller_1 = require("./controllers/followShop.controller");
const followShop_service_1 = require("./services/followShop.service");
const unfollowShop_controller_1 = require("./controllers/unfollowShop.controller");
const unfollowShop_service_1 = require("./services/unfollowShop.service");
const getAllFollowShop_controller_1 = require("./controllers/getAllFollowShop.controller");
const getAllFollowShop_service_1 = require("./services/getAllFollowShop.service");
const getReviewShop_controller_1 = require("./controllers/getReviewShop.controller");
const getReviewShop_service_1 = require("./services/getReviewShop.service");
const createReviewShop_controller_1 = require("./controllers/createReviewShop.controller");
const createReviewShop_service_1 = require("./services/createReviewShop.service");
const updateReviewShop_controller_1 = require("./controllers/updateReviewShop.controller");
const updateReviewShop_service_1 = require("./services/updateReviewShop.service");
const myReviewShop_controller_1 = require("./controllers/myReviewShop.controller");
const myReviewShop_service_1 = require("./services/myReviewShop.service");
const deleteReviewShop_controller_1 = require("./controllers/deleteReviewShop.controller");
const deleteReviewShop_service_1 = require("./services/deleteReviewShop.service");
const getShopClient_controller_1 = require("./controllers/getShopClient.controller");
const getShopClient_service_1 = require("./services/getShopClient.service");
const getShopListClient_controller_1 = require("./controllers/getShopListClient.controller");
const getShopListClient_service_1 = require("./services/getShopListClient.service");
const getCategoryShop_service_1 = require("./controllers/getCategoryShop.service");
const getCategoryShop_service_2 = require("./services/getCategoryShop.service");
const getDetailProductShop_controller_1 = require("./controllers/getDetailProductShop.controller");
const getDetailProductShop_service_1 = require("./services/getDetailProductShop.service");
const getAllProductShopClient_controller_1 = require("./controllers/getAllProductShopClient.controller");
const getAllProductShopClient_service_1 = require("./services/getAllProductShopClient.service");
const getProductHomePage_controller_1 = require("./controllers/getProductHomePage.controller");
const getProductHomePage_service_1 = require("./services/getProductHomePage.service");
const getAllProductByCategoryGlobal_controller_1 = require("./controllers/getAllProductByCategoryGlobal.controller");
const getAllProductByCategoryGlobal_service_1 = require("./services/getAllProductByCategoryGlobal.service");
const httpController = [
    getProfileShop_controller_1.GetProfileShopController,
    updateProfileShop_controller_1.UpdateShopController,
    followShop_controller_1.FollowShopController,
    unfollowShop_controller_1.UnFollowShopController,
    getAllFollowShop_controller_1.ListFollowShopController,
    getReviewShop_controller_1.GetReviewShopController,
    createReviewShop_controller_1.CreateReviewShopController,
    updateReviewShop_controller_1.UpdateReviewShopController,
    deleteReviewShop_controller_1.DeleteReviewShopController,
    myReviewShop_controller_1.MyReviewShopController,
    getShopListClient_controller_1.GetShopListClientController,
    getCategoryShop_service_1.GetCategoryShopClientController,
    getShopClient_controller_1.GetShopClientController,
    getDetailProductShop_controller_1.GetDetailProductShopClientController,
    getAllProductShopClient_controller_1.GetAllProductShopClientController,
    getProductHomePage_controller_1.GetAllProductHomePageShopClientController,
    getAllProductByCategoryGlobal_controller_1.GetAllProductByCategoryGlobalClientController
];
const Repository = [];
const Services = [
    getProfileShop_service_1.GetProfileShopService,
    updateProfileShop_service_1.UpdateProfileShopService,
    followShop_service_1.ShopFollowerService,
    unfollowShop_service_1.UnFollowerService,
    getAllFollowShop_service_1.ListShopFollowerService,
    getReviewShop_service_1.ShopReviewService,
    createReviewShop_service_1.CreateShopReviewService,
    updateReviewShop_service_1.UpdateShopReviewService,
    myReviewShop_service_1.MyShopReviewService,
    deleteReviewShop_service_1.DeleteReviewService,
    getShopClient_service_1.GetShopClientService,
    getShopListClient_service_1.GetShopListClientService,
    getCategoryShop_service_2.GetDetailCategoryShopClientService,
    getDetailProductShop_service_1.GetDetailProductShopClientService,
    getAllProductShopClient_service_1.GetAllProductShopClientService,
    getProductHomePage_service_1.GetAllProductHomePageClientService,
    getAllProductByCategoryGlobal_service_1.GetAllProductByCategoryGlobalClientService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService,
];
let ShopModule = class ShopModule {
};
exports.ShopModule = ShopModule;
exports.ShopModule = ShopModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository, notification_gateway_1.NotificationGateway],
    })
], ShopModule);
//# sourceMappingURL=shop.module.js.map