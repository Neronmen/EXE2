"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const supabase_service_1 = require("../common/subapase/supabase.service");
const auth_module_1 = require("../auth/auth.module");
const notification_gateway_1 = require("../notifications/gateway/notification.gateway");
const create_product_controller_1 = require("./controllers/create-product.controller");
const create_product_service_1 = require("./services/create-product.service");
const get_all_product_controller_1 = require("./controllers/get-all-product.controller");
const get_all_product_service_1 = require("./services/get-all-product.service");
const get_detail_product_controller_1 = require("./controllers/get-detail-product.controller");
const get_detail_product_service_1 = require("./services/get-detail-product.service");
const update_product_controller_1 = require("./controllers/update-product.controller");
const update_product_service_1 = require("./services/update-product.service");
const add_new_image_product_controller_1 = require("./controllers/add-new-image-product.controller");
const add_new_image_product_service_1 = require("./services/add-new-image-product.service");
const set_main_image_product_controller_1 = require("./controllers/set-main-image-product.controller");
const set_main_image_product_service_1 = require("./services/set-main-image-product.service");
const delete_image_product_controller_1 = require("./controllers/delete-image-product.controller");
const delete_image_product_service_1 = require("./services/delete-image-product.service");
const change_status_product_controller_1 = require("./controllers/change-status-product.controller");
const change_status_product_service_1 = require("./services/change-status-product.service");
const delete_product_controller_1 = require("./controllers/delete-product.controller");
const delete_product_service_1 = require("./services/delete-product.service");
const view_users_like_product_controller_1 = require("./controllers/view-users-like-product.controller");
const view_users_like_product_service_1 = require("./services/view-users-like-product.service");
const httpController = [
    create_product_controller_1.CreateProductController,
    get_all_product_controller_1.GetAllProductController,
    get_detail_product_controller_1.GetDetailProductController,
    update_product_controller_1.UpdateProductController,
    add_new_image_product_controller_1.AddImageProductController,
    set_main_image_product_controller_1.SetMainImageProductController,
    delete_image_product_controller_1.DeleteImageProductController,
    change_status_product_controller_1.ChangeStatusProductController,
    delete_product_controller_1.DeleteProductController,
    view_users_like_product_controller_1.ViewUsersLikeProductProductController
];
const Repository = [];
const Services = [
    create_product_service_1.CreateProductService,
    get_all_product_service_1.GetAllProductService,
    get_detail_product_service_1.SellerProductService,
    update_product_service_1.UpdateProductService,
    add_new_image_product_service_1.AddImageProductService,
    set_main_image_product_service_1.SetMainImageProductService,
    delete_image_product_service_1.DeleteImageProductService,
    change_status_product_service_1.ChangeStatusProductService,
    delete_product_service_1.DeleteProductService,
    view_users_like_product_service_1.ViewUserLikeProductService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService,
];
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository, notification_gateway_1.NotificationGateway],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map