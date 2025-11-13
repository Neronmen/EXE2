"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const permission_module_1 = require("./modules/permission/permission.module");
const notification_module_1 = require("./modules/notifications/notification.module");
const profile_module_1 = require("./modules/profiles/profile.module");
const address_module_1 = require("./modules/address/address.module");
const payment_module_1 = require("./modules/payment/payment.module");
const seller_module_1 = require("./modules/seller/seller.module");
const shop_module_1 = require("./modules/shop/shop.module");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/products/product.module");
const like_module_1 = require("./modules/like/like.module");
const order_module_1 = require("./modules/order/order.module");
const cart_module_1 = require("./modules/cart/cart.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            auth_module_1.AuthModule,
            permission_module_1.PermissionModule,
            notification_module_1.NotificationModule,
            profile_module_1.ProfileModule,
            address_module_1.AddressModule,
            payment_module_1.PaymentModule,
            seller_module_1.SellerModule,
            shop_module_1.ShopModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            like_module_1.LikeModule,
            order_module_1.OrderModule,
            cart_module_1.CartModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map