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
exports.ResendOTPController = void 0;
const common_1 = require("@nestjs/common");
const app_routes_1 = require("../../../configs/app.routes");
const app_permission_1 = require("../../../configs/app.permission");
const swagger_1 = require("@nestjs/swagger");
const resend_otp_dto_1 = require("../dtos/resend-otp.dto");
const resend_otp_service_1 = require("../services/resend-otp.service");
let ResendOTPController = class ResendOTPController {
    ResendOTPService;
    constructor(ResendOTPService) {
        this.ResendOTPService = ResendOTPService;
    }
    async resendOTP(dto) {
        return await this.ResendOTPService.resendOTP(dto.email);
    }
};
exports.ResendOTPController = ResendOTPController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: app_permission_1.resourcesV1.RESEND_OTP.displayName }),
    (0, common_1.Post)(app_routes_1.routesV1.auth.resendOTP),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_otp_dto_1.ResendOTPDTO]),
    __metadata("design:returntype", Promise)
], ResendOTPController.prototype, "resendOTP", null);
exports.ResendOTPController = ResendOTPController = __decorate([
    (0, swagger_1.ApiTags)(`${app_permission_1.resourcesV1.RESEND_OTP.parent}`),
    (0, common_1.Controller)(app_routes_1.routesV1.apiversion),
    __metadata("design:paramtypes", [resend_otp_service_1.ResendOTPService])
], ResendOTPController);
//# sourceMappingURL=resend-otp.controller.js.map