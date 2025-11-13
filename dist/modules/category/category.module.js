"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../libs/prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const create_category_global_controller_1 = require("./controllers/create-category-global.controller");
const create_category_global_service_1 = require("./services/create-category-global.service");
const getList_category_global_controller_1 = require("./controllers/getList-category-global.controller");
const getList_category_global_service_1 = require("./services/getList-category-global.service");
const delete_category_global_controller_1 = require("./controllers/delete-category-global.controller");
const delete_category_global_service_1 = require("./services/delete-category-global.service");
const update_category_global_controller_1 = require("./controllers/update-category-global.controller");
const update_category_global_service_1 = require("./services/update-category-global.service");
const create_category_shop_controller_1 = require("./controllers/create-category-shop.controller");
const getList_category_shop_controller_1 = require("./controllers/getList-category-shop.controller");
const getList_category_shop_service_1 = require("./services/getList-category-shop.service");
const create_category_shop_service_1 = require("./services/create-category-shop.service");
const supabase_service_1 = require("../common/subapase/supabase.service");
const update_category_shop_controller_1 = require("./controllers/update-category-shop.controller");
const update_category_shop_service_1 = require("./services/update-category-shop.service");
const delete_category_shop_controller_1 = require("./controllers/delete-category-shop.controller");
const delete_category_shop_service_1 = require("./services/delete-category-shop.service");
const getDetail_category_shop_controller_1 = require("./controllers/getDetail-category-shop.controller");
const getDetail_category_shop_service_1 = require("./services/getDetail-category-shop.service");
const httpController = [
    create_category_global_controller_1.CreateCategoryController,
    getList_category_global_controller_1.GetListCategoryController,
    delete_category_global_controller_1.DeleteCategoryController,
    update_category_global_controller_1.UpdateCategoryController,
    create_category_shop_controller_1.CreateCategoryShopController,
    getList_category_shop_controller_1.GetListCategoryShopController,
    update_category_shop_controller_1.UpdateCategoryShopController,
    delete_category_shop_controller_1.DeleteCategoryShopController,
    getDetail_category_shop_controller_1.GetDetailCategoryShopController
];
const Repository = [];
const Services = [
    create_category_global_service_1.CreateCategoryGlobalService,
    getList_category_global_service_1.GetListCategoryGlobalService,
    delete_category_global_service_1.DeleteCategoryGlobalService,
    update_category_global_service_1.UpdateCategoryGlobalService,
    create_category_shop_service_1.CreateCategoryShopService,
    getList_category_shop_service_1.GetListCategoryShopService,
    update_category_shop_service_1.UpdateCategoryShopService,
    delete_category_shop_service_1.DeleteCategoryShopService,
    getDetail_category_shop_service_1.GetDetailCategoryShopService,
    supabase_service_1.SupabaseService,
    jwt_1.JwtService,
];
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [...httpController],
        providers: [...Services, ...Repository],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map