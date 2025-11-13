"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const supabase_service_1 = require("../common/subapase/supabase.service");
const auth_module_1 = require("../auth/auth.module");
const notification_gateway_1 = require("../notifications/gateway/notification.gateway");
const likeProduct_controller_1 = require("./controllers/likeProduct.controller");
const likeProduct_service_1 = require("./services/likeProduct.service");
const create_comment_product_controller_1 = require("./controllers/create-comment-product.controller");
const create_comment_product_service_1 = require("./services/create-comment-product.service");
const get_all_comment_product_controller_1 = require("./controllers/get-all-comment-product.controller");
const get_all_comment_product_service_1 = require("./services/get-all-comment-product.service");
const update_comment_product_controller_1 = require("./controllers/update-comment-product.controller");
const update_comment_product_service_1 = require("./services/update-comment-product.service");
const delete_comment_product_controller_1 = require("./controllers/delete-comment-product.controller");
const delete_comment_product_service_1 = require("./services/delete-comment-product.service");
const httpController = [
    likeProduct_controller_1.LikeAndUnlikeProductController,
    create_comment_product_controller_1.CreateCommentController,
    get_all_comment_product_controller_1.GetAllCommentController,
    update_comment_product_controller_1.UpdateCommentController,
    delete_comment_product_controller_1.DeleteCommentController
];
const Repository = [];
const Services = [
    likeProduct_service_1.LikeAndUnlikeProductService,
    create_comment_product_service_1.CreateProductCommentService,
    get_all_comment_product_service_1.GetAllCommentService,
    update_comment_product_service_1.UpdateProductCommentService,
    delete_comment_product_service_1.DeleteProductCommentService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService,
];
let LikeModule = class LikeModule {
};
exports.LikeModule = LikeModule;
exports.LikeModule = LikeModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository, notification_gateway_1.NotificationGateway],
    })
], LikeModule);
//# sourceMappingURL=like.module.js.map