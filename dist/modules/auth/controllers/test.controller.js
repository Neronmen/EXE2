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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const supabase_service_1 = require("../../common/subapase/supabase.service");
const platform_express_1 = require("@nestjs/platform-express");
let TestController = class TestController {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async test(files) {
        if (!files || files.length === 0) {
            return { message: 'Không có files nào' };
        }
        return this.supabaseService.upload(files);
    }
};
exports.TestController = TestController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.TEST.displayName }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "test", null);
exports.TestController = TestController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.TEST.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], TestController);
//# sourceMappingURL=test.controller.js.map